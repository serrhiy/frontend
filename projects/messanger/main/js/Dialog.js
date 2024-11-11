'use strict';

import Input from "./Input.js";

const dialog = document.getElementsByClassName('dialog').item(0);

const getCurrentTime = () => {
  const date = new Date();
  const options = { hour: 'numeric', minute: 'numeric', hour12: true };
  return date.toLocaleString('en-US', options);
}

const buildMessages = () => {
  const messages = document.createElement('div');
  return Object.assign(messages, { className: 'messages' });
};

const buildMessage = (text, time, myMessage = true) => {
  const message = document.createElement('div');
  const messageText = document.createElement('div');
  const messageTime = document.createElement('div');
  Object.assign(message, { className: myMessage ? 'my' : 'other' });
  Object.assign(messageText, { className: 'text' });
  Object.assign(messageTime, { className: 'time' });
  messageText.appendChild(document.createTextNode(text));
  messageTime.appendChild(document.createTextNode(time));
  message.append(messageText, messageTime);
  return message;
};

export default class Dialog {
  #input = null;
  #onMessage = null;
  #usersMessages = [];
  #messages = null;

  constructor(usersMessages) {
    const messages = buildMessages();
    for (const { message, time, myMessage } of usersMessages) {
      const generated = buildMessage(message, time, myMessage);
      messages.appendChild(generated);
    }
    this.#usersMessages = usersMessages;
    this.#input = new Input().onMessage((message) => {
      this.addMessage(message, true);
      this.#onMessage?.(message);
    });
    this.#messages = messages;
  }

  onMessage(listener) {
    this.#onMessage = listener;
    return this;
  }

  generate() {
    dialog.appendChild(this.#messages);
    this.#input.generate();
  }

  addMessage(message, myMessage = true, time = getCurrentTime()) {
    const generated = buildMessage(message, time, myMessage);
    this.#messages.appendChild(generated);
    this.#usersMessages.push({ message, time, myMessage });
    this.#messages.scrollTop = this.#messages.scrollHeight;
  }
}
