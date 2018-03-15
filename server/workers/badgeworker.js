const mongoose = require('mongoose')
const Redis = require('ioredis')
const client = new Redis(process.env.REDIS_URL)
const io = require('socket.io-emitter')(client)
const Badge = require('../models/badge')
const UserCurrency = require('../models/userCurrency')
const UserBadge = require('../models/userBadge')

mongoose.promise = global.Promise
mongoose.connect(process.env.MONGODB_URI, {useMongoClient: true, promiseLibrary: global.Promise})

let alertUser = function(userBadge){
  client.get(userBadge.user_id, (err, reply)=>{
    if(!err && reply){
      const socketId = reply.toString()
      io.to(socketId).emit('badge', userBadge.badge_id)
    }
  })
}

let getAllBadges = new Promise((resolve, reject) => {
  Badge.find({}, (err, badges) => {
    if (err) {
      reject()
    } else {
      resolve(badges)
    }
  })
})

let getUserIdIntersection = function (allUserIdObjects) {
  let shortestSet = allUserIdObjects[0]

  //find shortest set
  for (let i = 1; i < allUserIdObjects; i++) {
    let hashSet = allUserIdObjects[i]
    if (Object.keys(hashSet).length < Object.keys(shortestSet).length) {
      shortestSet = hashSet
    }
  }

  //Get intersection
  allUserIdObjects.forEach(set => {
    if (set !== shortestSet) {
      for (let key in shortestSet) {
        if (shortestSet.hasOwnProperty(key)) {
          shortestSet[key] = set[key]
        }
      }
    }
  })

  return shortestSet
}

let checkAndCreateBadge = function (badge) {
  return new Promise((resolve, reject) => {


    const currencyThresholds = badge.currency_thresholds

    if (currencyThresholds) {
      const numberOfThresholdsToCheck = currencyThresholds.length

      let allUserIds = []

      currencyThresholds.forEach(ct => {
        const query = {
          $or: [
            {
              'checked': false,
              'amount': {$gte: ct.threshold},
              'currencyId': ct.currency_id
            },
            {
              'checked': null,
              'amount': {$gte: ct.threshold},
              'currencyId': ct.currency_id
            }
          ]
        }
        UserCurrency.find(
          query,
          (err, userCurrencies) => {
            //TODO: Reduce this to a single findAndUpdate query
            UserCurrency.update(query, {$set: {'checked': true}}, (err) => {
            })
            let userHashSetObject = {}

            userCurrencies.forEach(uc => {
              userHashSetObject[uc.userId] = true
            })
            allUserIds.push(userHashSetObject)


            const hasGottenAllUserIds = (Boolean)(allUserIds.length && (allUserIds.length === numberOfThresholdsToCheck))
            if (hasGottenAllUserIds) {
              let interSectionObject = getUserIdIntersection(allUserIds)

              let userIdsToGetBadge = []
              for (let key in interSectionObject) {
                if (interSectionObject.hasOwnProperty(key)) {
                  if (interSectionObject[key]) {
                    let userBadge = new UserBadge({
                      user_id: key,
                      badge_id: badge._id
                    })
                    userIdsToGetBadge.push(userBadge)
                  }
                }
              }

              UserBadge.insertMany(userIdsToGetBadge, {ordered: false}, (err, insertedDocs) => {
                resolve('success')
                if (insertedDocs) {
                  insertedDocs.forEach(userBadge => {
                    console.log('Awarded new badge to user: ' + userBadge.user_id)
                    alertUser(userBadge)
                  })
                }

              })

            }
          })
      })
    }
  })
}

let createNewBadges = function (badges) {
  return new Promise((resolve, reject) => {
    const totalNumberOfBadges = badges.length
    let numberOfBadgesChecked = 0
    badges.forEach(badge => {
      checkAndCreateBadge(badge).then(() => {
        if (++numberOfBadgesChecked === totalNumberOfBadges) {
          resolve()
        }
      })
    })
  })
}


let runEveryMinute = function () {
  console.log('Badge run started: ' + new Date())
  let startTime = new Date().getTime()
  getAllBadges.then(badges => {
    createNewBadges(badges).then(() => {
      console.log('Badge run finished: ' + new Date())
      let endTime = new Date().getTime()
      let milliSecPassed = endTime - startTime
      const milliSecUntilNextRun = 1000 * 60 - milliSecPassed
      if (milliSecUntilNextRun < 0) {
        runEveryMinute()
      } else {
        setTimeout(runEveryMinute, milliSecUntilNextRun)
      }
    })
  })
}

runEveryMinute()
