function throttle(fn, delay) {
  let lastCall = 0;

  return function (...args) {
    const now = Date.now();
    if (now - lastCall >= delay) {
      lastCall = now;
      return fn.apply(this, args);
    }
  };
}

// Example usage
const log = throttle(message => {
  console.log(message);
}, 1000);

// Call the throttled function multiple times
log('Hello');
log('World');
setTimeout(() => {
  log('This will be logged after 1 second');
}, 1000);
log('This will be logged at most once every second');
log('Another message'); // This will be ignored if called within 1 second
