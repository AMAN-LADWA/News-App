var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

var app = express();

mongoose.connect("mongodb://localhost:27017/node-blog");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
var postSchema = new mongoose.Schema({ body: String,title:String });
var Post = mongoose.model('Post', postSchema);
// Routes
app.get("/", (req, res) => {
   Post.find({}, (err, posts) => {
      res.render('index', { posts: posts})
   });
});

app.post('/addpost', (req, res) => {
    var postData = new Post(req.body,req.title);
    postData.save().then( result => {
        res.redirect('/');
    }).catch(err => {
        res.status(400).send("Unable to save data");
    });
});
// Listen
app.listen(3000, () => {
    console.log('Server listing on 3000');
})