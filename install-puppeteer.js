const { exec } = require('child_process');

// Install Puppeteer with Chromium
exec('npm install puppeteer --unsafe-perm=true --allow-root', (error, stdout, stderr) => {
  if (error) {
    console.error(`Error installing Puppeteer: ${error.message}`);
    process.exit(1);
  }
  console.log(`Puppeteer installed successfully: ${stdout}`);
});
