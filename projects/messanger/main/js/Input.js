'use strict';

const dialog = document.getElementsByClassName('dialog').item(0);

const buildInput = () => {
  const messageInput = document.createElement('div');
  const input = document.createElement('input');
  Object.assign(messageInput, { className: 'message-input' });
  Object.assign(input, { type: 'text', placeholder: 'Write a message...' });
  messageInput.appendChild(input);
  return [messageInput, input];
};

export default class Input {
  #onMessage = null;
  #messageInput = null;

  constructor() {
    const [messageInput, input] = buildInput();
    input.addEventListener('keypress', (event) => {
      if (event.key !== 'Enter') return;
      const { value: text } = input;
      input.value = '';
      this.#onMessage?.(text);
    });
    this.#messageInput = messageInput;
  }

  generate() {
    dialog.appendChild(this.#messageInput);
  }

  onMessage(listener) {
    this.#onMessage = listener;
    return this;
  }
}
