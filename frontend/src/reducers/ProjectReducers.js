import {PROJECTS_LIST_REQUEST, PROJECTS_LIST_SUCCESS, PROJECTS_LIST_FAIL, PROJECTS_DETAILS_REQUEST, PROJECTS_DETAILS_FAIL, PROJECTS_DETAILS_SUCCESS, PROJECTS_DELETE_REQUEST, PROJECTS_DELETE_SUCCESS, PROJECTS_DELETE_FAIL, PROJECTS_CREATE_REQUEST, PROJECTS_CREATE_SUCCESS, PROJECTS_CREATE_FAIL, PROJECTS_CREATE_RESET, PROJECTS_UPDATE_REQUEST, PROJECTS_UPDATE_SUCCESS, PROJECTS_UPDATE_FAIL, PROJECTS_UPDATE_RESET, PROJECTS_DETAILS_RESET, FILTER_PROJECTS_REQUEST, FILTER_PROJECTS_SUCCESS, FILTER_PROJECTS_FAIL, FILTER_PROJECTS_RESET} from '../constants/projectConstants'

export const projectListReducer = ( state={ projects:[] }, action ) => {
    switch (action.type) {
        case PROJECTS_LIST_REQUEST:
            return { loading: true, projects: [] }
        case PROJECTS_LIST_SUCCESS:
            return { loading: false, projects: action.payload }
        case PROJECTS_LIST_FAIL:
            return {loading: false, error: action.payload}
        default:
            return state
        }
}

export const projectDetailsReducer = ( state={ project:{} }, action ) => {
    switch (action.type) {
        case PROJECTS_DETAILS_REQUEST:
            return { loading: true, project: {} }
        case PROJECTS_DETAILS_SUCCESS:
            return { loading: false, project: action.payload }
        case PROJECTS_DETAILS_FAIL:
            return {loading: false, error: action.payload}
        case PROJECTS_DETAILS_RESET:
            return {project: {}}
        default:
            return state
        }
}

export const projectDeleteReducer = ( state={}, action ) => {
    switch (action.type) {
        case PROJECTS_DELETE_REQUEST:
            return { loading: true }
        case PROJECTS_DELETE_SUCCESS:
            return { loading: false, success: true }
        case PROJECTS_DELETE_FAIL:
            return {loading: false, error: action.payload}
        default:
            return state
        }
}

export const projectCreateReducer = ( state={}, action ) => {
    switch (action.type) {
        case PROJECTS_CREATE_REQUEST:
            return { loading: true }
        case PROJECTS_CREATE_SUCCESS:
            return { loading: false, success: true, project: action.payload }
        case PROJECTS_CREATE_FAIL:
            return {loading: false, error: action.payload}
        case PROJECTS_CREATE_RESET:
            return {}
        default:
            return state
        }
}

export const projectUpdateReducer = ( state={project:{}}, action ) => {
    switch (action.type) {
        case PROJECTS_UPDATE_REQUEST:
            return { loading: true }
        case PROJECTS_UPDATE_SUCCESS:
            return { loading: false, success: true, project: action.payload }
        case PROJECTS_UPDATE_FAIL:
            return {loading: false, error: action.payload}
        case PROJECTS_UPDATE_RESET:
            return {project: {}}
        default:
            return state
        }
}

export const filterProjectsReducer = ( state={ projects:[] }, action ) => {
    switch (action.type) {
        case FILTER_PROJECTS_REQUEST:
            return { loading: true }
        case FILTER_PROJECTS_SUCCESS:
            return { loading: false, success: true, projects: action.payload}
        case FILTER_PROJECTS_FAIL:
            return {loading: false, error: action.payload}
        case FILTER_PROJECTS_RESET:
            return {projects: []}
        default:
            return state
        }
}