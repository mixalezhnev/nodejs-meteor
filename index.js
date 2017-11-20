const express = require('express')
const exphbs = require('express-handlebars')
const path = require('path')
const bodyParser = require('body-parser')
const fs = require('fs')

const port = 3000;

// after
const app = express();

app.engine('.hbs', exphbs({
	defaultLayout: 'main',
	extname: '.hbs',
	layoutsDir: path.join(__dirname, 'views/layouts')
}))
app.set('view engine', '.hbs')
app.set('views')

app.get('/', (req, res) => {
	res.render('home', {
		name: 'Boroda'
	})
});

app.use((req, res, next) => {
	console.log(req.headers);
	next();
})

app.use('/fortune', (req, res, next) => {
	req.chance = Math.random()
	next()
})

app.use((err, req, res, next) => {
	// log the error
	console.log(err);
	res.status(400).send({
		message: 'Something broke!',
		'cause': err
	})
})

const users = []

app.use(bodyParser.json())

// app.post('/users', (req, res) => {
// 	const { name, age } = req.body;
// 	users.push({
// 		name,
// 		age,
// 	})
//
// 	res.send(users)
// })

app.post('/users', (req, res) => {
	const { name, age } = req.body;

	fs.appendFile('users.txt', JSON.stringify({
		name,
		age,
	}))
	res.send('write new user to a file')
})

app.listen(port, err => {
	if (err) {
		return console.warn('something bad happened', err);
	}

	console.log('server is listening');
})
