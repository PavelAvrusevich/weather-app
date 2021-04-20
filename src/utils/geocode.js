const request = require('request');

const geocode = (location, callback) => {
    const url =
        'https://api.mapbox.com/geocoding/v5/mapbox.places/' +
        encodeURIComponent(location) +
        '.json?access_token=pk.eyJ1IjoicGF2ZWwtYXZydXNldmljaCIsImEiOiJja25kZzQ5ODcyYXNtMnFwOXN5b2IwYnR2In0.JwY1sIvSVzh2-s2z6Rf4QQ&limit=1';
    request({ url, json: true }, (err, { body } = {}) => {
        if (err) {
            callback('Unable to connect to search service.', undefined);
        } else if (body.features.length === 0) {
            callback('Unable to find this location. Try to change find term.', undefined);
        } else {
            callback(undefined, {
                longitude: body.features[0].center[0],
                latitude: body.features[0].center[1],
                location: body.features[0].place_name,
            });
        }
    });
};

module.exports = geocode;
