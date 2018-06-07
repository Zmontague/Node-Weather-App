const request = require('request');



function weatherInformation (lat, lng, callback) {
    request({
        url: `https://api.darksky.net/forecast/ddb4d2f2eff08887f61bfc948260315a/${lat},${lng}`,
        json: true
    }, (error, response, body) => {
        if (error) {
            console.log('Unable to connect to Forecast.io server.');
        } else if (response.statusCode === 400) {
            console.log('Unable to fetch weather.');
        } else if (!error && response.statusCode === 200) {
            callback(undefined, {
                currentStatus: body.currently.summary,
                temperature: body.currently.temperature
            })
        }
    })
}

module.exports.weatherInformation = weatherInformation;