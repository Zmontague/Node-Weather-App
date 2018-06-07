const request = require('request');

function geocodeAddress (address, callback) {
const encodedAddress = encodeURIComponent(address);

    request({
        url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=AIzaSyDpxc2JZcRpym_fWeXGWt8INbsjoKYMVdY`,
        json: true
    }, (error, response, body) => {
    if (body.status === 'OK') {
        callback(undefined, {
            address: body.results[0].formatted_address,
            lat: body.results[0].geometry.location.lat,
            lng: body.results[0].geometry.location.lng
        });
    } else if (error) {
        callback('Unable to connect to Google servers.');
    } else if (body.status === 'ZERO_RESULTS') {
        callback('Unable to find that address');
    }
    });
}



module.exports.geocodeAddress = geocodeAddress;