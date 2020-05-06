# WebNovel

WebNovel is a web application allowing users to collaborate on big pieces of text non-linearly. More accurately 
it lets users create new parallel chapters wherever they want in a book, creating a book with a tree structure.

## Development

To run this project you must have Node.js, npm and angular-cli installed.

To install all dependencies run:

`npm install`

There are two main components in this project. The server, written in node, which provide the APIs, as well as the initial html page.
The front-end is written in Angular, which means that it is a single-page application. This means you must first build the angular application:

`ng build`

This will create a compiled project in a dist folder, which the node server will serve from the root of the website.
If you want live updates, meaning the website updates as you write code, run `ng build --watch`.

Then you need to start the node server by running `node index.js`.

If you also want to run the badgeworker process, which checks whether to award a new badge to users every minute run 
`node index.js` with environment variable PROCESS_TYPE=badge-worker

## Environment variables
In order for the server code to run you need to have the following environment variables set:

MONGODB_URI: `mongo://<username>:<password>@<localhost>:<port>/<collection>`

SECRET: `<any string>` (This is used by the local login)

REDIS_URL: `127.0.0.1:6379` (Redis is used to keep track of the mapping of userIDs and socketIDs.
this way it is available for all processes.)

For development purposes the easiest way to use Redis is to just run a server locally...

### Optional
RECAPTCHA_SECRET: `<secret from recaptcha>` (This is only needed if you want recaptcha to work)

NODE_ENV: `development | production`

PROCESS_TYPE: `web | badge-worker` (Defaults to web) 

## Other info
This project was written as part of a master thesis which can be found here: http://bora.uib.no/handle/1956/19624

# License
MIT

