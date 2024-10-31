'use strict';

import Input from "./Input.js";

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

export default class Dialog {
  #dialog = null;
  #input = null;
  #onMessage = null;

  constructor(messages) {
    const divMessages = document.createElement('div');
    divMessages.className = 'messages';
    for (const { message, time, myMessage } of messages) {
      const generated = buildMessage(message, time, myMessage);
      divMessages.appendChild(generated);
    }
    this.#dialog = divMessages;
    this.#input = new Input().onMessage((message) => {
      const generated = buildMessage(message, getCurrentTime(), true);
      divMessages.prepend(generated);
      this.#onMessage?.(message);
    }).generate();
  }

  generate() {
    const generated = document.createElement('div');
    generated.append(this.#dialog, this.#input);
    return generated;
  }

  onMessage(listener) {
    this.#onMessage = listener;
    return this;
  }
}