const processType = process.env.PROCESS_TYPE

if (processType === 'web') {
  require('./server')
} else if (processType === 'badge-worker') {
  require('./server/workers/badgeworker')
} else {
  require('./server')
}
