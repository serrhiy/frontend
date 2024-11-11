'use strict';

import setResizing from './resizing.js';
import Chat from './Chat.js';

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
    chat.generate();
    chat.dialog.onMessage((message) => {
      setTimeout(() => {
        chat.dialog.addMessage('My answer is: ' + message, false);
      }, 3000);
    });
  }
};

main();
