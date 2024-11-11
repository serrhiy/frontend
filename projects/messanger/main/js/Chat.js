'use strict';

import Dialog from './Dialog.js';

const chatList = document.getElementsByClassName('chat-list').item(0);
const divDialog = document.getElementsByClassName('dialog').item(0);

const buildChat = (user, avatar, text, date, unreadMessages) => {
  const chat = document.createElement('div');
  const img = document.createElement('img');
  const info = document.createElement('div');
  Object.assign(chat, { className: 'chat' });
  Object.assign(img, { src: avatar, alt: 'User\'s avatar' });
  Object.assign(info, { className: 'info' });
  chat.append(img, info);
  const top = document.createElement('div');
  const buttom = document.createElement('div');
  Object.assign(top, { className: 'top' });
  Object.assign(buttom, { className: 'buttom' });
  info.append(top, buttom);
  const username = document.createElement('div');
  const time = document.createElement('div');
  Object.assign(username, { className: 'username' });
  Object.assign(time, { className: 'time passive' });
  username.appendChild(document.createTextNode(user));
  time.appendChild(document.createTextNode(date));
  top.append(username, time);
  const message = document.createElement('div');
  message.appendChild(document.createTextNode(text));
  Object.assign(message, { className: 'message passive' });
  buttom.appendChild(message);
  if (unreadMessages > 0) {
    const unrMessages = document.createElement('div');
    const number = document.createElement('div');
    number.appendChild(document.createTextNode(unreadMessages));
    Object.assign(unrMessages, { className: 'unread-messages' });
    Object.assign(number, { className: 'number' });
    unrMessages.appendChild(number);
    buttom.appendChild(unrMessages);
  }
  return chat;
};

export default class Chat {
  #dialog = null;
  #chat = null;

  constructor(data) {
    const { user: { username, avatar }, messages, unreadMessages } = data;
    const { message, time } = messages[0];
    const chat = buildChat(username, avatar, message, time, unreadMessages);
    const dialog = new Dialog(messages);
    chat.addEventListener('click', () => {
      const active = document.getElementsByClassName('chat active').item(0);
      if (active) active.classList.remove('active');
      chat.classList.add('active');
      divDialog.innerHTML = '';
      this.#dialog.generate();
    });
    this.#dialog = dialog;
    this.#chat = chat;
  }

  generate() {
    chatList.appendChild(this.#chat);
  }

  get dialog() {
    return this.#dialog;
  }
}
