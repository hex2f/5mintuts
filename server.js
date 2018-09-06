// Open a socket server on port 3001 (http://localhost:3001)
const io = require('socket.io')(3001)

const express = require('express')
const app = express()

// Load files from ./app
app.use(express.static('app'))

// Load index.html for all the requests that arent in ./app
app.get('*', (req, res) => res.sendFile(`${__dirname}/app/index.html`))

// Open a webserver on port 3000 (http://localhost:3000)
app.listen(3000)

io.on('connection', (socket) => {
  // Join the user to their requester room
  socket.on('joinRoom', (data) => {
    socket.join(data)
  })

  // Broadcast any new message to all other clients in the room
  socket.on('createMessage', (data) => {
    if (data.text.length > 0) { // Only broadcast the new message if it has any text.
      io.to(data.to).emit('newMessage', data)
    }
  })
})
