# WebNovel

WebNovel is a web application allowing users to collaborate on big pieces of text non-linearly. More accurately 
it lets users create new parallel chapters wherever they want in a book, creating a book with a tree structure.

## Development

To run this project you must have Node.js and angular-cli installed.

There are two main components in this project. The server, written in node, which provide the APIs, as well as the initial html page.
The front-end is written in Angular, which means that it is a single-page application. This means you must first build the angular application:

`ng build`

This will create a compiled project in a dist folder, which the node server will serve from the root of the website.
If you want live updates, meaning the website updates as you write code, run `ng build --watch`.

Then you need to start the node server by running `node server.js`.

# License
MIT

