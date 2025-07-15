function debounce(func, wait) {
  let timeout;

  return function (...args) {
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(() => {
      func.apply(this, args);
    }, wait);
  };
}

// Example usage

const log = debounce(message => {
  console.log(message);
}, 1000);

// Call the debounced function multiple times
log('Hello');
log('World');
log('This will be logged after 1 second');
