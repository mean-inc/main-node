module.exports = {
  apps : [{
    name   : "api mean-shop",
    script : "./index.js",
    exec_mode : "cluster",
    env: {
      NODE_ENV: '.env'
    },
    autorestart: true,
    instance: '1',
  }]
}
