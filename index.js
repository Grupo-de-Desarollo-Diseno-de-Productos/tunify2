const express = require('express');
const path = require('path');
const app = express();
const port = 8000;

// Serve static files from the "src/ directory
app.use(express.static(path.join(__dirname, 'src')));

app.get('/', (req, res) => {
    res.sendFile('index.html', { root: path.join(__dirname, 'src') });
    console.log(__dirname)
});

app.listen(port, () => {
    console.log(`Tunify is now running on localhost:${port}`);
});