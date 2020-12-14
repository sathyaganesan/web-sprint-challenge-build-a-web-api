// Write your "projects" router here!
const express = require('express');
const projects = require('./projects-model');
const router = express.Router();

router.post('/api/projects', (req, res, next) => {
    if (!req.body.name || !req.body.description) {
        res.status(400).json({
            Message: "Name or description is missing"
        })
    }
    projects.insert(req.body)
        .then((project) => {
            res.status(200).json(project);
        })
        .catch((error) => {
            next(error);
    })
})

router.get('/api/projects', (req, res, next) => {
    projects.get(req.params.id)
        .then((projects) => {
            res.status(200).json(projects)
        })
        .catch((error) => {
            next(error);
        })
});





module.exports = router;