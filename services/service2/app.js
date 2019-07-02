const moleculer = require('moleculer');

const broker = new moleculer.ServiceBroker({
  transporter: {
    type: 'NATS',
    options: {
      url: process.env.NATSURL || 'nats://localhost:4222',
      user: 'admin',
      pass: '1234'
    }
  },
  tracing: {
    enabled: true,
    stackTrace: true,
    exporter: [
      {
        type: 'Jaeger',
        options: {
          endpoint: process.env.JAEGER || 'http://localhost:14268/api/traces',
          sampler: {
            type: 'const',
          },
          tracerOptions: {},
        }
      }
    ]
  },
});

broker.createService({
  name: 'service2',
  actions: {
    test: {
      handler(ctx) {
        console.log('=== service2.test called');

        return new Promise((resolve, reject) => {
          setTimeout(() =>{
            resolve();
          }, 200);
        })
      }
    }
  }
});


broker.start();



