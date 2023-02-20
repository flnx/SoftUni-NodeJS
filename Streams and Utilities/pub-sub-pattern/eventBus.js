const { EventEmitter } = require("stream");

const events = {};

// function subscribe(eventName, callback) {
//     if (!events[eventName]) {
//         events[eventName] = [];
//     }

//     events[eventName].push(callback);
// }

// function publish(eventName, data) {
//     const currentSubscribers = events[eventName];

//     if (currentSubscribers) {
//         currentSubscribers.forEach((callback) => callback(data));
//     }
// }

// const eventBus = {
//     subscribe,
//     publish,
// };

// module.exports = eventBus;

const emitter = new EventEmitter();
module.exports = emitter;

