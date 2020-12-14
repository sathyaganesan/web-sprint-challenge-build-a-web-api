// Write your "actions" router here!
const express = require('express');
const actions = require('./actions-model');
const router = express.Router();

router.post('/api/actions', (req, res) => {
    if (!req.body.project_id ) {
        res.status(400).json({
            Message: "ID is required"
        })
    }
    actions.insert(req.body)
        .then((action) => {
            res.status(200).json(action);
        })
        .catch((error) => {
            console.log(error);
            res.status(500).json({
                Message: "Can't post action"
            })
        })
})

module.exports = router;