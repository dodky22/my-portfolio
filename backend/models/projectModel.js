import mongoose from 'mongoose'

import slugify from 'slugify'

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

projectSchema.pre('save', function(next) {
  this.slug = slugify(this.name);
  next();
});


const Project = mongoose.model('Project', projectSchema);

export default Project
