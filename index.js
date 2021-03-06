const express = require('express');
const app = express();
const fs = require('fs');
const _ = require('lodash');
let users = [];

fs.readFile('users.json', {encoding: 'utf8'}, (err, data) => {
    if(err) throw err;

    JSON.parse(data)
        .forEach(user => {
            user.name.full = _.startCase(user.name.first + ' ' + user.name.last);
            users.push(user);
            // console.log(users);
        });
});

app.get('/', (req, res) => {
    let buffer = '';

    users.forEach(user => {
        buffer += `<a href="/` + user.username + `">` + user.name.full + `</a><br>`;
    });

    res.send(buffer);
});

app.get(/big.*/, (req, res, next) => {
    console.log('big user');
    next();
});

app.get('/:username', (req, res) => {
    let username = req.params.username;
    res.send(username);
})

app.listen(3000, () => {
    console.log('App listening to port 3000');
});