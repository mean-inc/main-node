module.exports = {
  apps : [{
    name   : "api mean-shop",
    script : "./index.js",
    env: {
      NODE_ENV: '.env'
    },
    autorestart: true,
    instance: '1',
  }]
}
