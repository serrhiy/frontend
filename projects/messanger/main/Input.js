'use strict';

const buildInput = () => {
  const messageInput = document.createElement('div');
  const input = document.createElement('input');
  messageInput.className = 'message-input';
  input.className = ''
  input.autocomplete = 'off';
  input.type = 'text';
  input.placeholder = 'Type a massage...';
  messageInput.appendChild(input);
  return { input, messageInput };
};

export default class Input {
  #onMessage = null;
  #messageInput = null;

  constructor() {
    const { input, messageInput } = buildInput();
    input.addEventListener('keypress', (event) => {
      if (event.key !== 'Enter') return;
      const { value: text } = input;
      input.value = '';
      this.#onMessage?.(text);
    });
    this.#messageInput = messageInput;
  }

  onMessage(listener) {
    this.#onMessage = listener;
    return this;
  }

  generate() {
    return this.#messageInput;
  }
}