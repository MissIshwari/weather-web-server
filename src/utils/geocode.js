const request = require('request')

const geocode = ((address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiaXNod2FyaTk4IiwiYSI6ImNsMHBqbWtpZTA4MzAzbHBlaTRtcXc5YmsifQ.kJ1bxi7a6e8X25AvXjTzFw&limit=1'
    request({ url, json: true }, (error, { body } = {}) => {
        if (error) {
            callback('Unable to connect to location services!', undefined)
        }
        else if (body.features.length === 0) {
            callback('Unable to find location. Try another location', undefined)
        }
        else {
            callback(undefined, {
                'location': body.features[0].place_name,
                'longitude': body.features[0].center[0],
                'latitude': body.features[0].center[1]
            })
        }
    })
})

module.exports = geocode