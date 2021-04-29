const path = require('path');
const express = require('express');
const hbs = require('hbs');
const forecast = require('./utils/forecast');
const geocode = require('./utils/geocode');

const app = express();
const port = process.env.PORT || 3000;

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setuphandlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather info',
        name: 'PavelAvrusevich',
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'help message',
        title: 'Help',
        name: 'PavelAvrusevich',
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        name: 'PavelAvrusevich',
        title: 'About',
    });
});

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: "Location hasn't been provided",
        });
    }

    geocode(req.query.address, (err, { latitude, longitude, location } = {}) => {
        if (err) {
            return res.send({ err });
        }

        forecast(latitude, longitude, (err, forecastData) => {
            if (err) {
                return res.send({ err });
            }

            res.send({
                location,
                forecast: forecastData,
            });
        });
    });
});

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'Error 404',
        message: 'Help article not found.',
        name: 'PavelAvrusevich',
    });
});

app.get('*', (req, res) => {
    res.render('404', {
        title: 'Error 404',
        name: 'PavelAvrusevich',
        message: 'Page not found.',
    });
});

app.listen(port, () => {
    console.log('Server is up on port ' + port);
});
