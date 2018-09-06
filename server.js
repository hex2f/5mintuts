const io = require('socket.io')(3001)

const express = require('express')
const app = express()

app.use(express.static('app'))

app.get('*', (req, res) => res.sendFile(`${__dirname}/app/index.html`))

app.listen(3000)

io.on('connection', (socket) => {
  socket.on('joinRoom', (data) => {
    socket.join(data)
  })
  socket.on('createMessage', (data) => {
    if (data.text.length > 0) {
      io.to(data.to).emit('newMessage', data)
    }
  })
})
