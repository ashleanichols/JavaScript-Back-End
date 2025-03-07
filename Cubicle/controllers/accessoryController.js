const accessorySchema = require('../models/accessory');
const cubeSchema = require('../models/cube');
const authentication = require('../common/authentication');

function getCreateAccessory(req, res) {
    const auth = authentication.checkForAuthentication(req, res);
    res.render('createAccessory.hbs', { auth });
}

function postCreateAccessory(req, res) {
    const { name, imageUrl, description } = req.body;

    accessorySchema.create({ name, imageUrl, description })
        .then(accessory => {
            console.log(accessory);
            res.redirect('/');
        }).catch(err => {
            if (err.name === 'ValidationError') {
                res.render('createAccessory.hbs', {
                    error: err.errors
                });
            }
        });
}

function getAttachAccessory(req, res) {
    const cubeId = req.params.id;

    cubeSchema.findById(cubeId).then(cube => Promise.all([
        cube,
        accessorySchema.find({ cubes: { $nin: cubeId } })
    ])).then(([cube, filterAccessories]) => {
        res.render('attachAccessory.hbs', {
            cube,
            accessories: filterAccessories.length > 0 ? filterAccessories : null
        });
    }).catch(err => {
        console.log(err);
    });
}

function postAttachAccessory(req, res) {
    const cubeId = req.params.id;
    const { accessory: accessoryId } = req.body;

    Promise.all([
        cubeSchema.updateOne({ _id: cubeId }, { $push: { accessories: accessoryId } }),
        accessorySchema.updateOne({ _id: accessoryId }, { $push: { cubes: cubeId } })
    ]).then(() => {
        res.redirect('/');
    }).catch(err => {
        console.log(err);
    });
}

module.exports = {
    getCreateAccessory,
    postCreateAccessory,
    getAttachAccessory,
    postAttachAccessory
}