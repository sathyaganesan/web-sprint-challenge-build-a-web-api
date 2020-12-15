// Write your "projects" router here!
const express = require('express');
const projects = require('./projects-model');
const { validateProjectId, validateData } = require('./project-middleware');
const router = express.Router();

router.post('/api/projects', validateData(), (req, res, next) => {
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

router.get('/api/projects/:id', validateProjectId(), (req, res) => {
    res.status(200).json(req.project); //where this project comes from
});

// How to change only description without name other way
router.put('/api/projects/:id', validateData(), (req, res, next) => {
    projects.update(req.params.id, req.body)
        .then((project) => {
            if (req.params.id || req.boby) {
                res.status(200).json(project)
            } else {
                res.status(400).json({
                    Message: "ID of the project does not match"
                })
            }
        })
        .catch((error) => next(error));
});

router.delete('/api/projects/:id', (req, res, next) => {
    projects.remove(req.params.id)
        .then((project) => {
            if (project > 0) {
                res.status(200).json({
                    Message: "Selected project has been deleted"
                })
            } else {
                res.status(404).json({
                    Message: "ID with specific project does not exsist"
                })
            }
        })
        .catch((error) => next(error));
})

router.get('/api/projects/:id/actions', (req, res, next) => {
    if (!req.params.id) {
        res.status(400).json({
            Message: "ID with specific project does not exsist"
        })
    }
    projects.getProjectActions(req.params.id)
        .then((actions) => {
            res.status(200).json(actions);
        })
        .catch((error) => next(error));
})

module.exports = router;