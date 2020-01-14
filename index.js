var vfile = require('to-vfile');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var report = require('vfile-reporter');
var unified = require('unified');
var dutch = require('retext-dutch');
var stringify = require('retext-stringify');
var readability = require('retext-readability');
// view engine
app.set('view engine', 'ejs');
// use
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));


// get homepage
app.get('/', (req, res) => {
    res.render('index');
})

app.post('/', (req, res) => {
    console.log('sup', req.body.readableText);
    var input = req.body.readableText;
    var output;

    unified()
        .use(dutch)
        .use(readability)
        .use(readability, { age: 12 })
        .use(stringify)
        .process(input, function(err, file) {
            console.error(report(err || file))
                // console.log(file);
            return output = file;
        });

    console.log('output zit hier', output);
    res.render('index', { output: output });
})

// listening for
app.listen(3000, () => {
    console.log('Example app listening on port 3000!');
});