const request = require('request');

function geocodeAddress (address) {
const encodedAddress = encodeURIComponent(address);

    request({
        url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=AIzaSyDpxc2JZcRpym_fWeXGWt8INbsjoKYMVdY`,
        json: true
    }, (error, response, body) => {
    if (body.status === 'OK') {
        const formattedAddress = body.results[0].formatted_address;
        const lat = body.results[0].geometry.location.lat;
        const lng = body.results[0].geometry.location.lng;
        console.log(`Address: ${formattedAddress}`);
        console.log(`Lat: ${lat}`);
        console.log(`Long: ${lng}`);
    } else if (error) {
        console.log('Unable to connect to Google servers.');
    } else if (body.status === 'ZERO_RESULTS') {
        console.log('Unable to find that address');
    }
    });
}



module.exports.geocodeAddress = geocodeAddress;