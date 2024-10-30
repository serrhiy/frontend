'use strict';

import setResizing from './resizing.js';

const messageInput = document.getElementById('message-input');
const messages = document.getElementsByClassName('messages').item(0);

const getCurrentTime = () => {
  const date = new Date();
  const options = { hour: 'numeric', minute: 'numeric', hour12: true };
  return date.toLocaleString('en-US', options);
}

const buildMessage = (text, time, myMessage = true) => {
  const message = document.createElement('div');
  const messageText = document.createElement('div');
  const messageTime = document.createElement('div');
  message.className = myMessage ? 'my-message' : 'persons-message';
  messageText.className = 'text';
  messageTime.className = 'time';
  messageText.appendChild(document.createTextNode(text));
  messageTime.appendChild(document.createTextNode(time));
  message.append(messageText, messageTime);
  return message;
};

messageInput.addEventListener('keypress', (event) => {
  if (event.key !== 'Enter') return;
  const { value: text } = messageInput;
  const time = getCurrentTime();
  const message = buildMessage(text, time);
  messages.prepend(message);
  messageInput.value = '';
  setTimeout(() => {
    const answer = 'My answer is: ' + text;
    const answerTime = getCurrentTime();
    const answerMessage = buildMessage(answer, answerTime, false);
    messages.prepend(answerMessage);
  }, 3000);
});


setResizing();
