var faker = require('faker');
var mysql = require('mysql');

var connection = mysql.createConnection(
    {
        host : 'localhost',
        user : 'root',
        password : '12345678',
        database : 'chat_app_db'
    }
);
connection.connect();

var insert_query_users = 'insert into users (username, email, password, first_name, last_name, sex, dob, contact_number, created_at) values ?';
var insert_query_messages = 'insert into messages (sent_by, received_by, sent_at, content ) values ? '
var data = [];
var data2 = [];
for (i = 0; i < 100; i++) {
    data.push(
        [
            faker.internet.userName(),
            faker.internet.email(),
            faker.internet.password(),
            faker.name.firstName(),
            faker.name.lastName(),
            'M',
            faker.date.past(),
            faker.random.number({min:1000000000, max:9999999999}),
            faker.date.past(),
        ]
    );
}
for (i = 0; i < 200; i++) {
    data2.push(
        [
            faker.random.number({min:1, max:100}),
            faker.random.number({min:1, max:100}),
            faker.date.past(),
            faker.lorem.sentence()
        ]
    )
}

connection.query(insert_query_users, [data], function(error, results){
    console.log(error)
    console.log(results);
});
connection.query(insert_query_messages, [data2], function(error, results){
    console.log(error)
    console.log(results);
});
connection.end();

