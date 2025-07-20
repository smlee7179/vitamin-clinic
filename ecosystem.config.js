module.exports = {
  apps: [
    {
      name: 'vitamin-clinic',
      script: 'npm',
      args: 'start',
      cwd: '/home/pi/vitamin-clinic',
      instances: 1,
      exec_mode: 'fork',
      max_memory_restart: '512M',
      env: {
        NODE_ENV: 'production',
        PORT: 3000
      },
      error_file: './logs/err.log',
      out_file: './logs/out.log',
      log_file: './logs/combined.log',
      time: true,
      node_args: '--max-old-space-size=512',
      watch: false,
      ignore_watch: ['node_modules', 'logs'],
      kill_timeout: 5000,
      wait_ready: true,
      listen_timeout: 8000
    }
  ]
};
