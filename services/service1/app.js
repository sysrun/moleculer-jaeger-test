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
  name: 'service1',
  actions: {
    test: {
      handler(ctx) {
        console.log('=== service1.test called');
        return new Promise((resolve, reject) => {
          setTimeout(() =>{
            ctx.call('service2.test')
              .then(() => {
                resolve();
              })
              .catch(() => {
                reject();
              })
          }, 200);
        })
      }
    }
  },
  methods: {
    invoke() {
      broker.logger.info('>>> calling service1.test')
      this.actions.test()
        .then(() => {
          broker.logger.info('<<< service1.test result received');
          setTimeout(() => {
            this.invoke();
          }, 500);
        })
        .catch(() => {
          broker.logger.info('<<< service1.test result received');
          setTimeout(() => {
            this.invoke();
          }, 500);
        });
    }
  },
  started() {
    this.invoke();
  }
});

broker.start();



