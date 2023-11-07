// const fs = require('fs');
const express = require('express');
const morgan = require('morgan')
const mongoose = require('mongoose');
const Blog = require('./models/blog');

const app = express();

mongoose.connect(dbURI)
    .then(() => {
        // listen for the requests 
        app.listen(8080);
        console.log('data base connected');
    });

// view engine
app.set('view engine', 'ejs');
// here I'm changing default folder for the views. "views" name is default 
app.set('views', `${__dirname}/my_views`);

// by .use method we can apply middleware to the requests
// middleware is every function that runs between request and response
// to tell middleware that we can move on, we have to use next() method on the end
app.use((req, res, next) => {
    // console.log(req.method);
    next();
})
app.use(morgan('dev'));
app.use(express.static('public'));

app.get('/add-blog', (req,res ) => {
    const blog = new Blog({
        title: 'new blog',
        snippet: 'about my new blog',
        body: 'more about my new blog'
    });

    blog.save()
        .then((results) => res.send(results))
        .catch((err) => console.log(err));
})

app.get('/all-blogs', (req, res) => {
    Blog.find()
    .then((results) => {
        res.send(results);
    })
    .catch(err => console.log(err))
})

app.get('/single-blog', (req, res) => {
    Blog.findById('654a2f1355c7beb4346fec54')
    .then((results) => res.send(results))
})

app.get('/', (req, res) => {
    Blog.find()
    .then((results) => {
        res.render('index', { myName: "Kuba", blogs: results })
        // res.send(results);
    })
    .catch(err => console.log(err))
    // const blogs = [
    //     {title: 'Yoshi finds eggs', snippet: 'Lorem ipsum dolor sit amet consectetur'},
    //     {title: 'Mario finds stars', snippet: 'Lorem ipsum dolor sit amet consectetur'},
    //     {title: 'How to defeat bowser', snippet: 'Lorem ipsum dolor sit amet consectetur'},
    //   ];
    // res.render('index', { myName: "Kuba", blogs })
    // res.sendFile('./views/index.ejs', { root: __dirname })
});
app.get('/about', (req, res) => {
    res.render('about')
    // res.sendFile('./views/about.ejs', { root: __dirname })
});

app.get('/create', (req,res) => {
    res.render('create')
})
// app.get('/about-us', (req, res) => {
    // res.redirect('/about')
// });

// app.use is for rendering a default page (for unknown path). It needs to be on the bottom
app.use((req, res) => {
    res.render('404')
    // res.sendFile('./views/404.ejs', { root: __dirname })
})
 