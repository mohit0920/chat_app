// const mysql = require('mysql')
// var connection = mysql.createConnection(
//     {
//         host : 'localhost',
//         user : 'root',
//         password : '12345678',
//         database : 'chat_app_db'
//     }
// )
// var p = {
//     a: 'Mohit',
//     b:'asdfHJKL8#'
// }
// var q = `select user_id from users where (username = ?) && (password= ?)`
//
// connection.query(q, [p.a,p.b], (err, results ) => {
//
//     try {
//
//
//     if(results) {
//         console.log(results[0].user_id)
//         //connection.end()
//     }}
//
//     catch {
//         console.log('Not found')
//         //connection.end()
//     }
// })
//
// var a = [10, 30, 50]
// var b = 20
// var c = {
//     a: a,
//     b: b
// }
// console.log(c.a[2])
var express = require('express')
var parseurl = require('parseurl')
var session = require('express-session')

var app = express()

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
}))

app.use(function (req, res, next) {
    if (!req.session.views) {
        req.session.views = {}
    }

    // get the url pathname
    var pathname = parseurl(req).pathname

    // count the views
    req.session.views[pathname] = (req.session.views[pathname] || 0) + 1

    next()
})

app.get('/foo', function (req, res, next) {
    res.send('you viewed this page ' + req.session.views['/foo'] + ' times')
    console.log(req.session)
})

app.get('/bar', function (req, res, next) {
    res.send('you viewed this page ' + req.session.views['/bar'] + ' times')
})
app.listen(8008, () => {
    console.log('listen 8008')
})