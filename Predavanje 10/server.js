const express = require('express');
const path = require('path');
const fs = require('fs').promises;

const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

const blogsFilePath = path.join(__dirname, 'blogs.json');

app.get('/', async (req, res) => {
    try {
        const admin = req.query.admin === 'true';
        const data = await fs.readFile(blogsFilePath, 'utf8');
        const blogs = JSON.parse(data);
        res.render('index', { blogs, admin })
    } catch (error) {
        res.status(500).send('Desio se error: ' + error);
    }
});

app.get('/blog/:id', async (req, res) => {
    const blogId = req.params.id;
    try {
        const data = await fs.readFile(blogsFilePath, 'utf8');
        const blogs = JSON.parse(data);
        const blog = blogs.find(b => b.id === blogId);
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
        const data = await fs.readFile(blogsFilePath, 'utf8');
        const blogs = JSON.parse(data);
        const blog = blogs.find(b => b.id === blogId);
        if (blog) {
            blog.posts.push(content);
            await fs.writeFile(blogsFilePath, JSON.stringify(blogs, null, 2));
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
        const data = await fs.readFile(blogsFilePath, 'utf8');
        const blogs = JSON.parse(data);
        const newBlog = {
            id: (blogs.length + 1).toString(),
            title: title,
            posts: []
        };

        blogs.push(newBlog);
        await fs.writeFile(blogsFilePath, JSON.stringify(blogs, null, 2));
        res.redirect('/');
    } catch (error) {
        res.status(500).send('Desio se error: ' + error);
    }
})

app.listen(PORT);