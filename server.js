const express = require('express');
const fetch = require('node-fetch');
const app = express();
const PORT = process.env.PORT || 3000; // Use Render's provided port

// Proxy route
app.get('/proxy', async (req, res) => {
  const targetUrl = 'https://makerworld.com/en/3d-models'; // Replace with the target website

  try {
    // Fetch the content of the target website
    const response = await fetch(targetUrl);
    const data = await response.text();

    // Serve the content to the client
    res.send(data);
  } catch (error) {
    console.error('Error fetching the target website:', error);
    res.status(500).send('Error fetching the target website');
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Proxy server running on http://localhost:${PORT}`);
});
