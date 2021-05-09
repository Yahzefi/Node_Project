const express = require('express');
const router = express.Router();
const members = require('../API/members');

router.get('/', (req, res) => res.json(members))

router.post('/', (req, res) => {
    const newMember = {
        id: req.body.id,
        name: req.body.name,
        email: req.body.email,
        status: req.body.status
    }
    if(members.some(member => member.id === newMember.id)) return;
    members.push(newMember);
    res.json(members);
})

module.exports = router;
