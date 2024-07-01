const {Schema, model} = require('mongoose')

 const noteSchema = new Schema({
    tittle: {
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    }
}, {
    timestamps: true
})

module.exports = model('Note', NoteSchema)