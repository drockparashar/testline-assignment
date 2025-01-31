const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(cors());

app.get('/quiz-data', async (req, res) => {
    try {
        const response = await axios.get('https://api.jsonserve.com/Uw5CrX');
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch quiz data' });
    }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Proxy server running on port ${PORT}`));
