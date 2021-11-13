import express from 'express'
import {getAllProjects, getProjectById, deleteProject, updateProject, createProject} from '../controllers/projectControllers.js'
import {protectRoute, isAdmin} from '../middleware/authMiddleware.js'

const router = express.Router()

router.route('/').get(getAllProjects).post(protectRoute, isAdmin, createProject)
router.route('/:id').get(getProjectById).delete(protectRoute, isAdmin, deleteProject).put(protectRoute, isAdmin, updateProject)

export default router
