# Build a chat app in 5 minutes!
Assumes basic knowledge in HTML, CSS and JS.

In this tutorial we will cover how to:
* Setup a web server using nodejs and expressjs.
* Reading from disk using the built in node package: fs.
* Sending and reciving data in realtime using socketio.

# Demo
![Chat Demo GIF](https://github.com/RekkyRek/5mintuts/blob/01_NodeChat/chat_demo.gif?raw=true)
# Stages
### Project Setup
1. Initialize NPM ```npm init```
2. Install the needed packages
``` npm i express --save ```
``` npm i socket.io --save ```
3. Make the project files (server.js, app.js, app.html and app.css)
### Express Setup
4. Setup the server by importing express (which is a package we use to serve our  website) . Make sure to also import 'fs' which we will use to read files from our servers disk.
```javascript
const express = require('express')
const app = express()
```
5. Done? Great! Now we can actually setup the web server. Start with giving express a route to serve the web page on.
```javascript
/*   
  '/' is the path it will register. So in our case, http://localhost
  '/somename' would look for requests on, http://localhost/somename
*/
app.get('/', function (req, res) {
  res.send('Hello World!')
})
```
6. Now we'll tell express to listen on a specific port. I'm going to use port 80 (which is the default port for http). This will require you being an administrator and port 80 not being used.
```javascript
app.listen(80, function () {
  console.log('Express is now running on port 80!')
})
```
If port 80 does not work for you; simply use 3000 instead, you will have to access your site with http://localhost:3000 instead.

Now if you start the server by running ```node server.js``` then go to http://localhost (:3000 if you used that instead of 80) in a browser, you shuold see "Hello World!". That means progress!
7. Now we will make express load our actual website! repalce ```'Hello World!'``` in ```res.send``` with ```fs.readFileSync('./app.html')```. Your code should now look like this:
```javascript
app.get('/', function (req, res) {
  res.send(fs.readFileSync('./app.html'))
})
```
Awesome! Now restart your node server by pressing CTRL+R in the terminal then running ```node server.js``` again. Now go to your browser and refresh. You got a blank screen right? That's how it shoud be since we have not written any html yet.
