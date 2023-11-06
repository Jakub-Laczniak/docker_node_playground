// const fs = require('fs');
const express = require('express');
const app = express();

// view engine
app.set('view engine', 'ejs');
// here I'm changing default folder for the views. "views" name is default 
app.set('views', `${__dirname}/my_views`);

// listen for the requests
app.listen(8080);

app.get('/', (req, res) => {
    res.render('index')
    // res.sendFile('./views/index.ejs', { root: __dirname })
});
app.get('/about', (req, res) => {
    res.render('about')
    // res.sendFile('./views/about.ejs', { root: __dirname })
});
// app.get('/about-us', (req, res) => {
    // res.redirect('/about')
// });
app.use((req, res) => {
    res.render('404')
    // res.sendFile('./views/404.ejs', { root: __dirname })
})
 