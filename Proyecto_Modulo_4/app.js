const path = require('path');
const express = require('express');
const hbs = require('hbs');
const weather = require('./src/utils/weather');

const app = express();

const port = process.env.PORT || 3000;

// Rutas de carpetas
const publicDirectoryPath = path.join(__dirname, './public');
const viewsPath = path.join(__dirname, './templates/views');

// Configuración de Express y HBS
app.set('view engine', 'hbs');
app.set('views', viewsPath);

// Archivos públicos
app.use(express.static(publicDirectoryPath));

// Página principal
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Jorge Flores'
    });
});

// Endpoint para consultar clima
app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'Debes capturar una localidad para consultar el clima.'
        });
    }

    weather(req.query.address, (error, data) => {
        if (error) {
            return res.send({ error });
        }

        res.send({
            location: data.location,
            country: data.country,
            temperature: data.temperature,
            feelslike: data.feelslike,
            description: data.description,
            humidity: data.humidity,
            windSpeed: data.windSpeed
        });
    });
});

app.listen(port, () => {
    console.log('Servidor iniciado en el puerto ' + port);
});