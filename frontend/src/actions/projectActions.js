import {PROJECTS_LIST_REQUEST, PROJECTS_LIST_SUCCESS, PROJECTS_LIST_FAIL, PROJECTS_DETAILS_REQUEST, PROJECTS_DETAILS_SUCCESS, PROJECTS_DETAILS_FAIL, PROJECTS_DELETE_REQUEST, PROJECTS_DELETE_SUCCESS, PROJECTS_DELETE_FAIL, PROJECTS_CREATE_SUCCESS, PROJECTS_CREATE_FAIL, PROJECTS_CREATE_REQUEST, PROJECTS_UPDATE_REQUEST, PROJECTS_UPDATE_SUCCESS, PROJECTS_UPDATE_FAIL, FILTER_PROJECTS_REQUEST, FILTER_PROJECTS_SUCCESS, FILTER_PROJECTS_FAIL, FILTER_PROJECTS_RESET} from '../constants/projectConstants'
import axios from 'axios'

export const listProjects = () => async(dispatch) => {
    try {
        dispatch({type: PROJECTS_LIST_REQUEST})

        const {data} = await axios.get('/api/projects')

        dispatch({type: PROJECTS_LIST_SUCCESS, payload: data})

    } catch (error) {
        dispatch({type: PROJECTS_LIST_FAIL, payload: error.response && error.response.data.message ? 
                    error.response.data.message : error.message})
        
    }
}

export const singleProject = (id) => async(dispatch) => {
    try {
        dispatch({type: PROJECTS_DETAILS_REQUEST})

        const {data} = await axios.get(`/api/projects/${id}`)

        dispatch({type: PROJECTS_DETAILS_SUCCESS, payload: data})

    } catch (error) {
        dispatch({type: PROJECTS_DETAILS_FAIL, payload: error.response && error.response.data.message ? 
                    error.response.data.message : error.message})
        
    }
}


export const deleteProject = (id) => async(dispatch, getState) => {
    try {
        dispatch({type: PROJECTS_DELETE_REQUEST})

        const {
            userLogin : { userInfo },
        } = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        await axios.delete(`/api/projects/${id}`, config)

        dispatch({type: PROJECTS_DELETE_SUCCESS})

    } catch (error) {
        dispatch({type: PROJECTS_DELETE_FAIL, payload: error.response && error.response.data.message ? 
                    error.response.data.message : error.message})
        
    }
}

export const createProject = () => async(dispatch, getState) => {
    try {
        dispatch({type: PROJECTS_CREATE_REQUEST})

        const {
            userLogin : { userInfo },
        } = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const {data} = await axios.post(`/api/projects`, {}, config)

        dispatch({type: PROJECTS_CREATE_SUCCESS, payload: data})

    } catch (error) {
        dispatch({type: PROJECTS_CREATE_FAIL, payload: error.response && error.response.data.message ? 
                    error.response.data.message : error.message})
        
    }
}

export const updateProject = (project) => async(dispatch, getState) => {
    try {
        dispatch({type: PROJECTS_UPDATE_REQUEST})

        const {
            userLogin : { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const {data} = await axios.put(`/api/projects/${project._id}`, project, config)

        dispatch({type: PROJECTS_UPDATE_SUCCESS, payload: data})

    } catch (error) {
        dispatch({type: PROJECTS_UPDATE_FAIL, payload: error.response && error.response.data.message ? 
                    error.response.data.message : error.message})
        
    }
}

export const filterProjectsByCategory = (category) => async(dispatch, getState) => {
        try {
                dispatch({type: FILTER_PROJECTS_REQUEST})

                const {
                    projectList : { projects },
                } = getState()
        
                const data = projects.filter((item) => item.technologies.includes(category));
        
                    if(category.toLowerCase() !== 'all'){
                        dispatch({type: FILTER_PROJECTS_SUCCESS, payload: {data, category}})
                    }else{
                            dispatch({type: FILTER_PROJECTS_RESET})
                    }  
            
            

        } catch (error) {
            dispatch({type: FILTER_PROJECTS_FAIL, payload: error.response && error.response.data.message ? 
                        error.response.data.message : error.message})
            
        }

}