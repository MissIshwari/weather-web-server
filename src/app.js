const path = require('path')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const express = require('express')
const hbs = require('hbs')

const app = express()
const port = process.env.PORT || 3000

//Define path for express config
const publicDir = path.join(__dirname, '../public')
const viewDir = path.join(__dirname, '../templates/views')
const partialsDir = path.join(__dirname, '../templates/partials')

//Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewDir)
hbs.registerPartials(partialsDir)

//Setup static directory to serve
app.use(express.static(publicDir))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        createdBy: 'Ishwari Pillay'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Ishwari Pillay',
        createdBy: 'Ishwari Pillay'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        message: 'This is a help page.',
        createdBy: 'Ishwari Pillay'
    })
})

app.get('/weather', (req, res) => {
    if (req.query.address) {
        geocode(req.query.address, (error, { longitude, latitude, location } = {}) => {
            if (error) {
                return res.send({ error })
            }
            else {
                forecast(longitude, latitude, (error, data) => {
                    if (error) {
                        return res.send({ error })
                    }
                    else {
                        return res.send({
                            forecast: data,
                            location: location,
                            address: req.query.address
                        })
                    }
                })
            }
        })
    } else {
        res.send({
            error: 'Please provide an address.'
        })
    }


})

app.get('/help/*', (req, res) => {
    res.render('ResourceNotFound', {
        title: '404',
        message: 'Help article not found.',
        createdBy: 'Ishwari Pillay'
    })
})

app.get('*', (req, res) => {
    res.render('ResourceNotFound', {
        title: '404',
        message: 'Page not found.',
        createdBy: 'Ishwari Pillay'
    })
})

app.listen(port, () => {
    console.log('Server is up at port ' + port)
})