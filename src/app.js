const path = require('path');
const express = require('express');
const hbs = require('hbs');

const app = express();

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
    res.send({ weather: '17 degre', location: 'Minsk' });
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

app.listen(3000, () => {
    console.log('Server is up on port 3000');
});
