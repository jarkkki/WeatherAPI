// Tuodaan tarvittavat kirjastot
const express = require('express'); // Express.js web-sovelluskehyksen tuonti
const axios = require('axios'); // Axios-kirjaston tuonti HTTP-pyyntöjen tekemiseen
const path = require('path'); // Path-kirjaston tuonti polkujen käsittelyyn
const bodyParser = require('body-parser'); // Body-parser-kirjaston tuonti pyyntöjen rungon jäsentämiseen
require('dotenv').config(); // Dotenv-kirjaston tuonti ympäristömuuttujien käsittelyyn

// Luodaan uusi Express-sovellus
const app = express();
app.set('view engine', 'ejs'); // Asetetaan EJS näkymämoottoriksi
const port = 3000; // Määritetään portti, jossa sovellus kuuntelee

// Käytetään body-parser middlewarea jäsentämään pyyntöjen runko
app.use(bodyParser.urlencoded({ extended: false }));

// Määritetään reitti juureen
app.get('/', (req, res) => {
    // Lähetetään index.html-tiedosto vastauksena
    res.sendFile(path.join(__dirname + '/index.html'));
});

// Määritetään reitti sääennusteelle
app.post('/forecast/', async (req, res) => {
    console.log(req.body); // Tulostetaan pyynnön runko konsoliin
    const { q, days } = req.body; // Otetaan pyynnön rungosta q ja days

    // Jos q puuttuu, lähetetään virheilmoitus
    if (!q) {
        return res.status(400).json({ error: 'Query parameter is required' });
    }

    // Määritetään asetukset HTTP-pyynnölle
    const options = {
        method: 'GET', // Metodi on GET
        url: 'https://weatherapi-com.p.rapidapi.com/forecast.json', // URL on sää-API:n osoite
        params: {
            q: q,
            days: days || 1 // Jos days ei ole määritetty, käytetään oletuksena 1
        },
        headers: {
            'X-RapidAPI-Key': process.env.RAPIDAPI_KEY, // API-avain
            'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com' // API-isäntä
        }
    };

    try {
        // Tehdään HTTP-pyyntö ja tallennetaan vastaus
        const response = await axios.request(options);
        console.log(response.data); // Tulostetaan vastauksen data konsoliin
        // Renderoidaan 'weather' näkymä ja lähetetään vastauksen data näkymälle
        res.render('weather', response.data);
    } catch (error) {
        // Jos tapahtuu virhe, tulostetaan virhe konsoliin ja lähetetään virheilmoitus
        console.error(error);
        res.status(500).json({ error: 'An error occurred while fetching the forecast' });
    }
});

// Käynnistetään sovellus määritetyssä portissa
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`); // Tulostetaan konsoliin, että palvelin on käynnissä
});

