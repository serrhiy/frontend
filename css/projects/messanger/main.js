'use strict';

const resizer = document.getElementsByClassName('resizer').item(0);
const chats = document.getElementsByClassName('chat-list').item(0);
const dialog = document.getElementsByClassName('dialog').item(0);

const setResizing = () => {
  let resizing = false;
  resizer.addEventListener('mousedown', () => {
    document.body.style.cursor = 'ew-resize';
    resizing = true;
  });
  document.addEventListener('mouseup', () => {
    document.body.style.cursor = 'auto';
    resizing = false;
  });
  document.addEventListener('mousemove', (event) => {
    if (!resizing) return;
    const { innerWidth: width } = window;
    const { clientX: x } = event;    
    const chatsPart = 100 * x / width;
    const dialogsPart = 100 - chatsPart;
    chats.style.flex = chatsPart;
    dialog.style.flex = dialogsPart;
  });
};

setResizing();
