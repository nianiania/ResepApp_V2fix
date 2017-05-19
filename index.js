//===============configuration==========

var express = require('express')
var app = express()
var path = require('path')
var bodyParse = require('body-parser')
var exphbs = require("express-handlebars")
var cookieParser = require('cookie-parser');

app.use(bodyParse.urlencoded({
    extended: true
}));
app.use(bodyParse.json());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }));
app.set('view engine', '.hbs')
    //==========SET UP=============
const Pool = require('pg').Pool;
var config = {
    user: 'postgres',
    database: 'resep',
    password: 'postgres',
    host: 'localhost',
    port: 5432,
    max: 10,
    idleTimeoutMillis: 30000,
};
process.on('unhandledRejection', function(e) {
    console.log(e.message, e.stack)
})
var pool = new Pool(config)

//===============routing========


app.route('/')
    .get(function(req, res) {
        res.render('home')
        // pool.query('SELECT * from resep')
        //     .then((result) => {
        //         var hasil = result.rows
        //         console.log('number:', hasil);

        //         res.render('resep', {
        //             data: hasil,
        //             judul: 'Rsep App with NodeJS'
        //         })
        //     })
        //     .catch((err) => {
        //         console.error('error running query', err);
        //     });
    })
    .post(function(req, res) {
        // var id = req.body.id
        // var nama_resep = req.body.nama_resep
        // var deskripsi = req.body.deskripsi
        // var penulis = req.body.penulis
        // var cara_pembuatan = req.body.cara_pembuatan

        // console.log(id + ' ' + nama_resep + ' ' + deskripsi + ' ' + penulis + ' ' + cara_pembuatan)

        // var query_post = 'insert into resep(id, nama_resep, deskripsi, penulis, cara_pembuatan)' + 'values($1, $2, $3, $4, $5)'

        // pool.query(query_post, [id, nama_resep, deskripsi, penulis, cara_pembuatan])
        //     .then((result) => {
        //         console.log('success insert data:', result);
        //         res.redirect('/')
        //     })
        //     .catch((err) => {
        //         console.log('error running query', err);
        //     })
    })

 


app.route('/resepmu')
    .get(function(req, res) {
        res.render('resepmu');

    })
    .post(function(req, res) {
        
    })


app.route('/signup')
    .get(function(req, res) {
        res.render('signup');

    })
    .post(function(req, res) {
        
    })


app.route('/signin')
    .get(function(req, res) {
        res.render('signin');

    })
    .post(function(req, res) {
        
    })


  

//============webserver=====

pool
    .query('CREATE TABLE IF NOT EXISTS resep(id SERIAL PRIMARY KEY, nama_resep VARCHAR(40) not null, deskripsi VARCHAR(40) not null, penulis VARCHAR(40) not null, cara_pembuatan VARCHAR(240) not null)')
    .then(function() {
        app.listen(4000, function() {
            console.log('server is listening on 4000')
        })
    })
