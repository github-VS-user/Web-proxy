const express = require('express');
const { chromium } = require('playwright');
const fs = require('fs'); // Add this to check if the file exists
const app = express();
const PORT = process.env.PORT || 3000;

// Proxy route
app.get('/proxy', async (req, res) => {
  const targetUrl = 'https://makerworld.com/en/3d-models'; // Replace with the target website

  try {
    // Log the Chromium path
    const chromiumPath = '/opt/render/.cache/ms-playwright/chromium-1155/chrome-linux/chrome';
    console.log('Chromium path:', chromiumPath);

    // Check if the Chromium executable exists
    if (!fs.existsSync(chromiumPath)) {
      throw new Error(`Chromium executable not found at ${chromiumPath}`);
    }

    // Launch a headless browser
    const browser = await chromium.launch({
      headless: true,
      executablePath: chromiumPath, // Correct Chromium path
      args: ['--no-sandbox', '--disable-setuid-sandbox'], // Required for Render
    });

    // Open a new page
    const page = await browser.newPage();

    // Set a realistic User-Agent header
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36');

    // Navigate to the target website
    await page.goto(targetUrl, { waitUntil: 'networkidle' });

    // Get the page content
    const content = await page.content();

    // Close the browser
    await browser.close();

    // Send the content to the client
    res.send(content);
  } catch (error) {
    console.error('Error fetching the target website:', error);
    res.status(500).send(`Error fetching the target website: ${error.message}`);
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Proxy server running on http://localhost:${PORT}`);
});
