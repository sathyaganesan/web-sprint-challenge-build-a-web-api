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
            // if (req.body.description.length > 50) {
                res.status(200).json(action);
            // } else {
            //     res.status(400).json({
            //         Message: "Description characters should be more than 50"
            //     })
            // }
           
        })
        .catch((error) => {
            console.log(error);
            res.status(500).json({
                Message: "Can't post action"
            })
        })
})

router.get('/api/actions', (req, res, next) => {
    actions.get(req.params.id)
        .then((action) => {
            res.status(200).json(action);
        })
        .catch((error) => next(error));
});

router.get('/api/actions/:id', (req, res, next) => {
    actions.get(req.params.id)
        .then((action) => {
            if (req.params.id) {
                res.status(200).json(action);
            } else {
                res.status(400).json({
                    Message: "Action with specific ID does not exsist"
                })
            }
        })
        .catch((error) => next(error));
});

router.put('/api/actions/:id', (req, res, next) => {
    if (!req.body.project_id) {
        res.status(400).json({
            Message: "Project ID or description is missing"
        })
    }
    actions.update(req.params.id, req.body)
        .then((action) => {
            if (req.params.id || req.body) {
                res.status(200).json(action);
            } else {
                res.status(400).json({
                    Message: "ID of the action does not match"
                })
            }
        })
        .catch((error) => next(error));
})

router.delete('/api/actions/:id', (req, res, next) => {
    actions.remove(req.params.id)
        .then((action) => {
            if (action > 0) {
                res.status(200).json({
                    Message: "Selected action has been deleted"
                })
            } else {
                res.status(400).json({
                    Message: "ID with specific project does not exsist"
                    
                })
            }
        })
        .catch((error) => next(error));
})

module.exports = router;