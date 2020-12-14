// Write your "projects" router here!
const express = require('express');
const projects = require('./projects-model');
const router = express.Router();

router.get('/api/projects', (req, res) => {
    projects.get()
        .then((projects) => {
            res.status(200).json(projects)
        })
        .catch((error) => {
            console.log(error);
            res.status(500).json({
                Message: "Projects not found"
            })
    })
}) 

module.exports = router;