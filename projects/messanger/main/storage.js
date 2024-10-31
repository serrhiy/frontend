'use strict';

const findValue = (path, data) => {
  const paths = path.split('.');
  let result = data;  
  for (const field of paths) {
    const exists = field in result;
    if (!exists) return null;    
    result = result[field];
  }
  return result;
}

export default (data, idKey) => {
  const storage = new Map();
  for (const item of data) {
    const id = findValue(idKey, item);    
    storage.set(id, item);
  }
  return storage;
};
