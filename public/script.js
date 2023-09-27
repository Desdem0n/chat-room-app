const socket = io();

document.addEventListener('DOMContentLoaded', () => {
  const nameInput = document.getElementById('name-input');
  const messageInput = document.getElementById('message-input');
  const sendButton = document.getElementById('send-button');
  const messagesContainer = document.getElementById('messages');

  let userName = '';

  function addMessage(sender, message) {
    const messageElement = document.createElement('div');
    messageElement.textContent = `${sender}: ${message}`;
    messagesContainer.appendChild(messageElement);
  }

  sendButton.addEventListener('click', () => {
    const message = messageInput.value.trim();
    if (message !== '') {
      socket.emit('message', { sender: userName, message });
      messageInput.value = '';
    }
  });

  nameInput.addEventListener('keydown', e => {
    if (e.key === 'Enter') {
      userName = nameInput.value.trim();
      nameInput.disabled = true;
    }
  });

  socket.on('message', data => {
    addMessage(data.sender, data.message);
  });
});
