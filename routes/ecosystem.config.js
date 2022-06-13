module.exports = {
  apps: [
    {
      name: 'routes',
      exec_mode: 'cluster',
      instances: 1,
      script: './build/routes/src/index.js',
      env: {
        JWT_KEY: 'asjdfhasjd²³²¡€32461²¡€856jhdjAFSD!@#^$@73',
        MONGO_URI: 'mongodb://localhost:27017/routes',
        NATS_CLUSTER_ID: 'orders',
        NATS_CLIENT_ID: '3',
        NATS_URL: 'nats://nats:4222',
        PORT: 3002,
      },
    },
  ],
};

