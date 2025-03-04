const express = require('express');
const puppeteer = require('puppeteer-core');
const app = express();
const PORT = process.env.PORT || 3000;

// Proxy route
app.get('/proxy', async (req, res) => {
  const targetUrl = 'https://makerworld.com/en/3d-models'; // Replace with the target website

  try {
    // Launch a headless browser
    const browser = await puppeteer.launch({
      headless: true,
      executablePath: '/usr/bin/chromium-browser', // Chromium path on Render
      args: ['--no-sandbox', '--disable-setuid-sandbox'], // Required for Render
    });

    // Open a new page
    const page = await browser.newPage();

    // Set a realistic User-Agent header
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36');

    // Navigate to the target website
    await page.goto(targetUrl, { waitUntil: 'networkidle2' });

    // Get the page content
    const content = await page.content();

    // Close the browser
    await browser.close();

    // Send the content to the client
    res.send(content);
  } catch (error) {
    console.error('Error fetching the target website:', error);
    res.status(500).send('Error fetching the target website');
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Proxy server running on http://localhost:${PORT}`);
});
