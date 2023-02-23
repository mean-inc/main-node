module.exports = {
  apps : [{
    name   : "api mean-shop",
    script : "./index.js",
    exec_mode : "cluster",
    autorestart: true,
    instance: '1',
  }],
  deploy: {
    production: {
      ref: "origin/main",
      path: "/opt/render/",
      env: {
        NODE_ENV: '.env'
      },
      'post-deploy': 'npm i && pm2 start e'
    }
  }
}
