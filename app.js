
const yargs = require('yargs');
const axios = require('axios');

const argv = yargs.options({
        a: {
            demand: true,
            alias: 'address',
            describe: 'Address to fetch weather for',
            string: true
        }
    })
    .help()
    .argv;

    const encodedAddress = encodeURIComponent(argv.address);
    const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=AIzaSyDpxc2JZcRpym_fWeXGWt8INbsjoKYMVdY`;

    axios.get(geocodeUrl).then((response) => {
        if (response.data.status === 'ZERO_RESULTS') {
            throw new Error('Unable to find that address.');
        }
        const lat = response.data.results[0].geometry.location.lat;
        const lng = response.data.results[0].geometry.location.lng;
        const weatherUrl =`https://api.darksky.net/forecast/ddb4d2f2eff08887f61bfc948260315a/${lat},${lng}`;
        console.log(response.data.results[0].formatted_address);
        return axios.get(weatherUrl);
    }).then((response) => {
        const temperature = response.data.currently.temperature;
        const currentStatus = response.data.currently.summary;
        const apparentTemperature = response.data.currently.apparentTemperature;
        console.log(`The weather outside is currently: ${currentStatus}.`);
        console.log(`The tempature is ${temperature} and it feels like ${apparentTemperature}.`);
    }).catch((error) => {
        if (error.code === 'ENOTFOUND') {
        console.log('Unable to connect to API servers.');
        } else {
            console.log(error.message);
        }
    });



