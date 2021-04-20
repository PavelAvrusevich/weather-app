const request = require('request');

const forecast = (latitude, longitude, callback) => {
    const url =
        'http://api.weatherstack.com/current?access_key=75b4a92051249c15337e6ae5b9a02c24&query=' +
        encodeURIComponent(latitude) +
        ',' +
        encodeURIComponent(longitude);
    request({ url, json: true }, (err, { body } = {}) => {
        if (err) {
            callback('Unable to connet to weather service.', undefined);
        } else if (body.err) {
            callback('Unable to find location', undefined);
        } else {
            callback(
                undefined,
                `${body.current.weather_descriptions}. It is currently ${body.current.temperature}. It feels like ${body.current.feelslike}`
            );
        }
    });
};

module.exports = forecast;
