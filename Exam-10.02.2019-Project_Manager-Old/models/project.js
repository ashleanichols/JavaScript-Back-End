const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true,
        maxlength: 50
    },
    teams: [{
        type: mongoose.Types.ObjectId,
        ref: 'Team'
    }]
});

module.exports = mongoose.model('Project', projectSchema);