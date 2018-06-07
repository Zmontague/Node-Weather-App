
const yargs = require('yargs');

const geocode = require('./geocode/geocode.js');
const weather = require('./darkskycode/weather.js');

const argv = yargs.options({
        a: {
            demand: true,
            alias: 'address',
            describe: 'Address to fetch weather for',
            string: true
        }
    }).help().argv;

geocode.geocodeAddress(argv.address, (errorMessage, results) => {
if (errorMessage) {
    console.log(errorMessage);
} else {
    console.log(JSON.stringify(results, undefined, 2));
    const lat = JSON.stringify(results.lat, undefined, 2);
    const lng = JSON.stringify(results.lng, undefined, 2);
    weather.weatherInformation(lat, lng, (errorMessage, results) => {
        console.log(JSON.stringify(results, undefined, 2));
    })
}
});

