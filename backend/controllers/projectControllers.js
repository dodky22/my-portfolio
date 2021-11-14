import asyncHandler from 'express-async-handler'
import Project from '../models/projectModel.js'

// @desc FETCH ALL PROJECTS
// @route GET /api/projects
// @access PUBLIC
export const getAllProjects = asyncHandler(async(req,res) => {
    const projects = await Project.find({})
 
    res.json(projects)
})

// @desc FETCH SINGLE PROJECT
// @route GET /api/projects/:id
// @access PUBLIC
export const getProjectById = asyncHandler(async(req,res) => {
    const project = await Project.findById(req.params.id)

    if(project){
        res.json(project)
    }else{
        res.status(404)
        throw new Error('Project not found, sorry')
    }
})


// @desc CREATE PROJECT
// @route POST /api/projects
// @access Private/Admin
export const createProject = asyncHandler(async(req,res) => {
    const project = new Project({
        name: 'Sample name',
        shortDesc: 'Sample short description',
        url: 'www.sampleurl.com',
        codeUrl: '-',
        description: 'Sample description',
        technologies: ['tech1', 'tech2', 'tech3'],
        status: 'Sample status',
        imgs: ['/uploaded_images/bookstore_1']
    })

    const createdProject = await project.save()
    res.status(201).json(createdProject) 
})

// @desc UPDATE PROJECT
// @route PUT /api/projects/:id
// @access Private/Admin
export const updateProject = asyncHandler(async(req,res) => {
    const {name, shortDesc, url, codeUrl, description, technologies, status, imgs} = req.body

    const project = await Project.findById(req.params.id)

    if(project){
        project.name = name
        project.shortDesc = shortDesc
        project.url = url
        project.codeUrl = codeUrl
        project.description = description
        project.technologies = technologies
        project.status = status
        project.imgs = imgs

        const updatedProject = await project.save()
        res.json(updatedProject)
    }else{
        res.status(404)
        throw new Error('Project not found')
    }     
})

// @desc DELETE PROJECT
// @route DELETE /api/projects/:id
// @access Private/Admin
export const deleteProject = asyncHandler(async(req,res) => {
    const project = await Project.findById(req.params.id)

    if(project){
        await project.remove()
        res.json({message: 'Project removed!'})
    }else{
        res.status(404)
        throw new Error('Project not found, sorry')
    }
})