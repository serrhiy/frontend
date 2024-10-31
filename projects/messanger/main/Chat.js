'use strict';

import Dialog from './Dialog.js';

const dialog = document.getElementsByClassName('dialog').item(0);

const buildChat = (user, avatar, text, date, messages) => {
  const chat = document.createElement('div');
  const info = document.createElement('div');
  const username = document.createElement('div');
  const message = document.createElement('div');
  const time = document.createElement('div');
  const img = document.createElement('img');
  chat.className = 'chat';
  info.className = 'info';
  username.className = 'username';
  time.className = 'time';
  message.className = 'message';
  img.className = 'avatar';
  img.src = avatar;
  img.alt = 'Avatar';
  username.appendChild(document.createTextNode(user));
  time.appendChild(document.createTextNode(date));
  message.appendChild(document.createTextNode(text));
  info.append(username, time, message);
  chat.append(img, info);
  if (messages > 0) {
    const notifications = document.createElement('div');
    const count = document.createElement('div');
    notifications.className = 'notifications';
    count.className = 'message-count';
    count.appendChild(document.createTextNode(messages));
    notifications.appendChild(count);
    info.appendChild(notifications);
  }
  return chat;
};

export default class Chat {
  #chat = null;
  #onMessage = null;

  constructor(data) {
    const { user: { username, avatar }, messages, unreadMessages } = data;
    const { message, time } = messages[0];
    const chat = buildChat(username, avatar, message, time, unreadMessages);
    this.#chat = chat;
    const generated = new Dialog(messages).onMessage((message) => {
      this.#onMessage?.(message);
    }).generate();
    chat.addEventListener('click', () => {
      const active = document.getElementsByClassName('chat active').item(0);
      if (active) active.classList.remove('active');
      chat.classList.add('active');
      dialog.innerHTML = '';
      dialog.appendChild(generated);
    });
  }

  generate() {
    return this.#chat;
  }

  onMessage(listener) {
    this.#onMessage = listener;
  }
}