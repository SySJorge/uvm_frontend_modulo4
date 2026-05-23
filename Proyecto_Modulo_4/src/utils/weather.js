const request = require('postman-request');

const weather = (address, callback) => {
    const accessKey = process.env.WEATHERSTACK_KEY || '4a059fb0d858078f2aa313919c620526';

    const url = 'http://api.weatherstack.com/current?access_key=' 
        + accessKey 
        + '&query=' 
        + encodeURIComponent(address) 
        + '&units=m';

    request({ url, json: true }, (error, response) => {
        if (error) {
            callback('No fue posible conectarse al servicio del clima.', undefined);
        } else if (response.body.error) {
            callback('No se encontró la localidad ingresada.', undefined);
        } else {
            callback(undefined, {
                location: response.body.location.name,
                country: response.body.location.country,
                temperature: response.body.current.temperature,
                feelslike: response.body.current.feelslike,
                description: response.body.current.weather_descriptions[0],
                humidity: response.body.current.humidity,
                windSpeed: response.body.current.wind_speed
            });
        }
    });
};

module.exports = weather;