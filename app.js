// Tuodaan tarvittavat kirjastot
const express = require('express'); // Express.js web-sovelluskehyksen tuonti
const axios = require('axios'); // Axios-kirjaston tuonti HTTP-pyyntöjen tekemiseen
const path = require('path'); // Path-kirjaston tuonti polkujen käsittelyyn
const bodyParser = require('body-parser'); // Body-parser-kirjaston tuonti pyyntöjen rungon jäsentämiseen
require('dotenv').config(); // Dotenv-kirjaston tuonti ympäristömuuttujien käsittelyyn

