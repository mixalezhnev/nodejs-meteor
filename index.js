const path = require('path')
const express = require('express')
const exphbs = require('express-handlebars')
const request = require('request-promise')

const app = express()
const port = 3001

app.engine('.hbs', exphbs({
  defaultLayout: 'main',
  extname: '.hbs',
  layoutsDir: path.join(__dirname, 'views/layouts')
}))
app.set('view engine', '.hbs')
app.set('views', path.join(__dirname, 'views'))

app.get('/:city', (req, res) => {
  request({
    uri: 'http://apidev.accuweather.com/locations/v1/search',
    qs: {
      q: req.params.city,
      apiKey: '295382'
    },
    json: true
  })
  .then(data => {
    res.render('index', data)
  })
  .catch(e => {
    console.log(e);
    res.render('error')
  })
})

app.listen(port)
