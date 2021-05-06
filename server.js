const express = require('express');
const path = require('path');
const members = require('./API/members');


const app = express();

// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, 'client', 'index.html'))
// })

app.get('/api/members', (req, res) => {
    res.json(members);
})

app.use(express.static(path.join(__dirname, 'client')));

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log("Server now running!"))
