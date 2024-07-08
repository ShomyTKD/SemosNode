const moongoose = require('mongoose');

const albumSchema = new moongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 2
    },
    artist: {
        type: String,
        required: true,
        minlength: 2
    },
    year: {
        type: Number,
        required: true,
        min: 1900,
        max: 2024
    },
})

const Album = moongoose.model('Album', albumSchema);

module.exports = Album;