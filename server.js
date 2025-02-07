const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(express.json());

// API pour récupérer les prix des cryptos
app.get('/api/prices', async (req, res) => {
    try {
        const response = await axios.get('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum&vs_currencies=usd');
        const prices = response.data;
        res.json({
            bitcoin: prices.bitcoin.usd,
            ethereum: prices.ethereum.usd
        });
    } catch (error) {
        res.status(500).send('Erreur lors de la récupération des prix');
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
