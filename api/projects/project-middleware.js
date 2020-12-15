const projects = require('./projects-model');

const validateProjectId = () => {
    return (req, res, next) => {
        projects.get(req.params.id)
            .then((project) => {
                if (project) {
                    req.project = project;
                    next();
                } else {
                    res.status(404).json({
                        Message: "ID with specific project does not exsist"
                    })
                }
            })
            .catch((error) => next(error));
    }
}

const validateData = () => {
    return (req, res, next) => {
        if (!req.body.name || !req.body.description) {
            res.status(400).json({
                Message: "Name or description is missing"
            })
        } else {
            next();
        }
    }
}

module.exports = {
    validateProjectId,
    validateData,
}