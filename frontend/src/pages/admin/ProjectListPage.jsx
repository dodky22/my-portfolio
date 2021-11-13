import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Link} from 'react-router-dom'
import {listProjects, deleteProject, createProject} from '../../actions/projectActions'
import {PROJECTS_CREATE_RESET} from '../../constants/projectConstants'
 
import Message from '../../components/Message'
import Loader from '../../components/Loader'

import styles from '../../css/AdminStyles.module.css'

const ProjectListPage = ({history, match}) => {
    const dispatch = useDispatch()

    const projectList = useSelector(state=> state.projectList)
    const {loading, error, projects} = projectList

    const userLogin = useSelector(state=> state.userLogin)
    const {userInfo} = userLogin

    const projectDelete = useSelector(state=> state.projectDelete)
    const {loading:loadingDelete, error:errorDelete, success:successDelete} = projectDelete

    const projectCreate = useSelector(state=> state.projectCreate)
    const {loading:loadingCreate, error:errorCreate, success:successCreate, project: createdProject} = projectCreate

    useEffect(() => {
        dispatch({type: PROJECTS_CREATE_RESET})

        if(!userInfo.isAdmin){
            history.push('/jm-login')
        }

        if(successCreate){
            history.push(`/admin/project/${createdProject._id}/edit`)
        }else{
            dispatch(listProjects())
        }
    }, [dispatch,history,userInfo, successDelete, successCreate, createdProject])
 
    const deleteProjectHandler = (id) => {
        if (window.confirm('Are you sure?')) {
            dispatch(deleteProject(id))
        }
    }
    const createProjectHandler = () => {
        dispatch(createProject())
    }

    return (
        <section className={styles.adminprojects}>
            <div>
                <h1>Projects</h1>
                <button onClick={createProjectHandler}><i className='fas fa-plus'></i>New project</button>
            </div>
            {loadingDelete && <Loader/>} 
            {errorDelete && <Message>{errorDelete}</Message>}
            {loadingCreate && <Loader/>} 
            {errorCreate && <Message>{errorCreate}</Message>}
            {loading ? <Loader /> : error ? <Message>{error}</Message> : (
                <table className={styles.projectstable}>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>NAME</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {projects && projects.map(project => (
                        <tr key={project._id}>
                            <td>{project._id}</td>
                            <td className={styles.nameLink}><Link to={`/project/${project._id}`} >{project.name}</Link></td>
                            <td>
                                <Link to={`/admin/project/${project._id}/edit`}>
                                    <button>
                                        <i className='fas fa-edit'/>
                                    </button>
                                </Link>
                                <button  onClick={() => deleteProjectHandler(project._id)}>
                                    <i className='fas fa-trash'/>
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
                </table>
            )}            
        </section>

    )
}

export default ProjectListPage
