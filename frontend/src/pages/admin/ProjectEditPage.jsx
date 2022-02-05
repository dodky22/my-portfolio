
import React, {useEffect} from 'react'
import {Link} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'

import Message from '../../components/Message'
import Loader from '../../components/Loader'
import UpdateProjectForm from '../../components/UpdateProjectForm'

import {singleProject} from '../../actions/projectActions'
import styles from '../../css/AdminStyles.module.css'

const ProjectEditPage = ({match, history}) => {
    const projectSlug = match.params.slug
    const projectId = match.params.id

    const dispatch = useDispatch()

    const projectDetails = useSelector(state => state.projectDetails)
    const {loading, error, project} = projectDetails

    const projectUpdate = useSelector(state => state.projectUpdate)
    const {loading:loadingUpdate, error:errorUpdate} = projectUpdate

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin

    useEffect(() => {
        if(!userInfo || !userInfo.isAdmin ){
            history.push('/jm-login')
        }
        if(project && project.slug === projectSlug){
            return
        }else{
            dispatch(singleProject(projectSlug))
        }
       // eslint-disable-next-line 
    }, [userInfo])

    return (
        <section className={styles.editSection} >
           <Link to='/admin/projects'><button className={styles.editBackBtn} >Go back</button></Link>
           <h1 >Edit project</h1>
           {loadingUpdate && <Loader />}
           {errorUpdate && <Message>{errorUpdate}</Message>}
           {loading ? (<Loader /> ): error ? (<Message variant='danger'>{error}</Message>) : (!loading && !error && project._id !== undefined) && (
              <UpdateProjectForm project={project} projectId={projectId} history={history}/>
           )}
        </section>
    )
}

export default ProjectEditPage
