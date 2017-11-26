const path = require('path')
const express = require('express')
const exphbs = require('express-handlebars')

const app = express()
const port = 3001

app.engine('.hbs', exphbs({
  defaultLayout: 'main',
  extname: '.hbs',
  layoutDir: path.join(__dirname, 'views/layouts')
}))

app.set('view engine', '.hbs')
app.set('views', path.join(__dirname, 'views'))

app.get('/user/:id', (req, res) => {
  res.render('home', {
    name: req.params.id,
  });
});


app.get('/file/:name', (req, res, next) => {
  const options = {
    root: __dirname + '/public/',
    dotfiles: 'deny',
    headers: {
      'x-timestamp': Date.now(),
      'x-sent': true
    }
  };

  const fileName = req.params.name;
  res.sendFile(fileName, options, err => {
    if (err)
      next(err);
    else {
      console.log('Sent: ', fileName);
    }
  });
});

app.use((err, req, res, next) => {
  console.log(err)
  // res.status(500).json({msg: 'Something went wrong'})
})

app.listen(port, err => {
  if (err)
    return console.log('somethnig bad happened', err);

  console.log(`server is listening on ${port}`);
})
