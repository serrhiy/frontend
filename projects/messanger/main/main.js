'use strict';

import setResizing from './resizing.js';
import Chat from './Chat.js';

const chatItem = document.getElementsByClassName('chats').item(0);

const getChats = async () => {
  const response = await fetch('./chats.json');
  const json = await response.json();
  return json;
}

const main = async () => {
  setResizing();
  const data = await getChats();
  for (const item of data) {
    const chat = new Chat(item);
    const view = chat.generate();
    chatItem.appendChild(view);
    chat.dialog.onMessage((message) => {
      chat.dialog.addMessage('My answer is: ' + message, false);
    });
  }
};

main();
