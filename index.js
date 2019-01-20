const mysql = require('mysql')
const express = require('express')
const path = require('path')
const app = express()
const bodyParser = require('body-parser');

// Set the default templating engine to ejs
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({extended: true}));


var connection = mysql.createConnection(
    {
        host : 'localhost',
        user : 'root',
        password : '12345678',
        database : 'chat_app_db'
    }
)
app.get('/', (req,res) => {
    res.render('index')
})
app.get('/create', (req,res) => {
    var occupied_usernames_query = 'select username, email from users;'
    connection.query(occupied_usernames_query, (error, results) => {
    //console.log(error)

    var occupied_usernames_and_emails_string_obj =   JSON.stringify(results)
    res.render("create", {occupied_usernames_and_emails_string: occupied_usernames_and_emails_string_obj})
})
})
app.post('/create/create_user', (req, res) => {
    var new_user = {
        username: req.body.username,
        email:  req.body.email,
        password: req.body.password,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        sex: req.body.sex,
        dob: req.body.dob,
        contact_number: req.body.contact_number
    }
    var insert_query = 'insert into users set ?'
    connection.query(insert_query, new_user, function (err, results) {
        res.redirect('/')
    })
})

app.listen(8009, () =>{
    console.log('app on 8009')
})
