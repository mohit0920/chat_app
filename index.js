const mysql = require('mysql')
const express = require('express')

var connection = mysql.createConnection(
    {
        host : 'localhost',
        user : 'root',
        password : '12345678',
        database : 'chat_app_db'
    }
)
connection.connect()

var occupied_usernames_query = 'select username, email from users;'
connection.query(occupied_usernames_query, (error, results) => {
    //console.log(error)
    var occupied_usernames = results
    console.log(occupied_usernames.length)
})

connection.end()
