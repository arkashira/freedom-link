const express = require('express');
const router = express.Router();

router.get('/api/data-usage', (req, res) => {
  // Simulating data usage statistics
  const dataUsage = {
    uploaded: 1024,
    downloaded: 2048,
    total: 3072,
  };
  res.json(dataUsage);
});

// Added error handling for API endpoint
router.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: 'Internal Server Error' });
});

module.exports = router;