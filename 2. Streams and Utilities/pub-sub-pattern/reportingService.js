// const eventBus = require('./eventBus');
const emitter = require('./eventBus');

const collect = (data) => {
    console.log('Reporting service - ' + data.method);
};

// eventBus.subscribe('request', collect);
emitter.on('request', collect);
