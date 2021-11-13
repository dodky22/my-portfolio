import mongoose from 'mongoose'

// import slug from 'mongoose-slug-generator'

// mongoose.plugin(slug);

const projectSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: [true, "add name"]
    },
    shortDesc:{
        type: String,
        trim: true,
        required: [true, "add short desc"]
    },
    url:{
        type: String,
        trim: true,
        required: [true, "add project url"]
    },
    codeUrl:{
        type: String,
        trim: true,
        required: [true, "add code url"]
    },
    description: {
        type: String,
        trim: true,
        required: [true, "add desc"]
    },
    technologies: {
        type: [String],
        trim: true,
        required: [true, "add tech"]
    },
    status: {
        type: String,
        trim: true,
        required: [true, "add status"]
    },
    slug: { 
        type: String,
        slug:"name",
        unique: true 
    },
    imgs: {
        type: Array,
        required: [true,"add at least two imgs"]
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});
const Project = mongoose.model('Project', projectSchema);

export default Project
