const express = require('express');
const path = require('path');

const app = express();
// Listen on environment PORT set by Azure, fallback to 3000 for local dev.
const PORT = process.env.PORT || 3000;

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// ... your routes here ...

app.listen(PORT, () => {
  console.log(`Frontend server is running and listening on port ${PORT}`);
});
