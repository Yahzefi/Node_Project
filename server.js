const express = require('express');
const path = require('path');
const members = require('./API/members');

const app = express();

app.use(express.json());

app.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'about.html'))
})

app.use(express.static(path.join(__dirname, 'client')));

app.use('/api/members', require('./Routes/member_route'));

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log("Server now running!"))
