const userID = Math.random().toString(36).substring(7)
const container = document.getElementById('messages')
const input = document.getElementById('chat')

const room = location.pathname
document.getElementById('topbar').innerText = room

// Connect to the socket server and join a room.
const socket = io(`http://${location.hostname}:3001`)
socket.emit('joinRoom', room)

async function drawMessage (message) {
  let messageContainer = document.createElement('div')
  let messageText = document.createElement('p')

  // Checks if you're scrolled more than 12 pixels from the bottom.
  let isScrolledToBottom = container.scrollHeight - container.clientHeight - container.scrollTop > 12

  // Set the text of the message and add it to the message container.
  messageText.innerText = message.text
  messageContainer.appendChild(messageText)

  // Add the CSS class "mine" if the message was sent by you.
  messageContainer.className = `message ${message.sender === userID ? 'mine' : ''}`

  // Add the message to the container
  container.appendChild(messageContainer)

  // If scroll distance to bottom is less than 12 pixels, scroll down to the new message smoothly.
  if (!isScrolledToBottom) {
    messageContainer.scrollIntoView({
      behavior: 'smooth'
    })
  }
}

// When the socket recieves "newMessage" run the function "drawMessage"
socket.on('newMessage', drawMessage)

async function sendMessage (message) {
  // Send "createMessage" with a message object to the server.
  socket.emit('createMessage', { text: message, sender: userID, to: room })
}

// Send a message when you press enter
function handleKey (e) {
  if (e.key === 'Enter') {
    sendMessage(input.value)
    input.value = ''
  }
}

input.addEventListener('keydown', handleKey)
