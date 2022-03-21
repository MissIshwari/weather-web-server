const request = require('request')

const forecast = ((longitude, latitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=e9e9460074e065b3367c61a0149db2f9&query=' + latitude + ',' + longitude
    request({ url, json: true }, (error, { body } = {}) => {
        if (error) {
            callback('Could not connect to location services!', undefined)
        }
        else if (body.error) {
            callback('Please enter appropriate coordinates to check the weather.', undefined)
        }
        else {
            callback(undefined, body.current.weather_descriptions[0]+'. It is currently ' + body.current.temperature + ' degrees out. It feels like ' + body.current.feelslike + ' degrees out. Humidity is '+body.current.humidity+'%.')
        }
    })
})

module.exports = forecast