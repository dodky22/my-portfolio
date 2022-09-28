import {createStore, combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'

import {projectListReducer, projectDetailsReducer,projectDeleteReducer,projectCreateReducer, projectUpdateReducer, filterProjectsReducer} from './reducers/ProjectReducers'
import {userLoginReducer, userRegisterReducer} from './reducers/userReducers'


const reducer = combineReducers({
    projectList: projectListReducer,
    projectDetails: projectDetailsReducer,
    projectDelete: projectDeleteReducer,
    projectCreate: projectCreateReducer,
    projectUpdate: projectUpdateReducer,
    filterProjects: filterProjectsReducer,
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer
})

const userInfoFromStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null

const initialState = {
    userLogin: {userInfo: userInfoFromStorage}
}

const middleware = [thunk]

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store