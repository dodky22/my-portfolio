import express from 'express'
import {getAllProjects,getProjectBySlug, deleteProject, updateProject, createProject} from '../controllers/projectControllers.js'
import {protectRoute, isAdmin} from '../middleware/authMiddleware.js'

const router = express.Router()

router.route('/').get(getAllProjects).post(protectRoute, isAdmin, createProject)
router.route('/:id').delete(protectRoute, isAdmin, deleteProject).put(protectRoute, isAdmin, updateProject)
router.route('/:slug').get(getProjectBySlug)

export default router
