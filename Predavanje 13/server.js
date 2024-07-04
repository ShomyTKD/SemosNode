const express = require('express');
const path = require('path');
const fs = require('fs').promises;

const app = express();
const PORT = 3000;
const mongoose = require('mongoose');
const Blog = require('./models/BlogEntity');

const MONGODB_URI = "mongodb+srv://mihajlorusanj:Ut1W3kbHkrAoX9F1@semosstudy.mg2banl.mongodb.net/BlogDatabase?retryWrites=true&w=majority&appName=SemosStudy";

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Konektovan'))
    .catch(err => console.log('Neuspela konekcija: ' + err));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

//const blogsFilePath = path.join(__dirname, 'blogs.json');

app.get('/', async (req, res) => {
    try {
        const admin = req.query.admin === 'true';
        //const data = await fs.readFile(blogsFilePath, 'utf8');
        //const blogs = JSON.parse(data);
        const blogs = await Blog.find().lean(); // .lean() konvertuje .bson u tabelu
        res.render('index', { blogs, admin })
    } catch (error) {
        res.status(500).send('Desio se error: ' + error);
    }
});

app.get('/blog/:id', async (req, res) => {
    const blogId = req.params.id;
    try {
        //const data = await fs.readFile(blogsFilePath, 'utf8');
        //const blogs = JSON.parse(data);
        //const blog = blogs.find(b => b.id === blogId);
        const blog = await Blog.findById(blogId).lean();
        if (blog) {
            res.render('blog', { blog });
        } else {
            res.status(404).send('Nismo pronašli blog')
        }

    } catch (error) {
        res.status(500).send('Desio se error: ' + error);
    }
});

app.post('/blogs/:id', async (req, res) => {
    const blogId = req.params.id;
    const { content } = req.body;
    try {
        //const data = await fs.readFile(blogsFilePath, 'utf8');
        //const blogs = JSON.parse(data);
        //const blog = blogs.find(b => b.id === blogId);
        const blog = await Blog.findByIdAndUpdate(blogId,
            { $push: { posts: content } },
            { new: true, runValidators: true });

        if (blog) {
            //blog.posts.push(content);
            //await fs.writeFile(blogsFilePath, JSON.stringify(blogs, null, 2));
            res.redirect('/blog/' + blog.id);
        } else {
            res.status(404).send('Nismo pronašli blog')
        }
    } catch (error) {
        res.status(500).send('Desio se error: ' + error);
    }
});

app.post('/blog/new', async (req, res) => {
    const { title } = req.body;
    try {
        //const data = await fs.readFile(blogsFilePath, 'utf8');
        //const blogs = JSON.parse(data);
        /* const newBlog = {
            id: (blogs.length + 1).toString(),
            title: title,
            posts: []
        }; */

        const newBlog = new Blog({
            title: title,
            posts: []
        });

        //blogs.push(newBlog);
        //await fs.writeFile(blogsFilePath, JSON.stringify(blogs, null, 2));
        await newBlog.save();
        res.redirect('/');
    } catch (error) {
        res.status(500).send('Desio se error: ' + error);
    }
});

app.get('/statistics', (req, res) => {
    const results = {
        blogsCount: undefined,
        postsCount: undefined
    };
    res.render('statistics', results);
});

app.post('/statistics', async (req, res) => {
    const results = {
        blogsCount: undefined,
        postsCount: undefined
    };
    if (req.body.postsCount) {
        const postsCount = await Blog.aggregate([
            { $project: { title: 1, postsCount: { $size: "$posts" } } } // $size vraca broj elemenata u nizu
        ]);
        results.postsCount = postsCount;
    }
    if (req.body.blogsCount) {
        const blogsCount = await Blog.countDocuments();
        results.blogsCount = blogsCount;
    }
    res.render('statistics', results);
});

app.listen(PORT);