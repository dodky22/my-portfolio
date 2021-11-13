import React, {useEffect} from 'react'

import {useDispatch, useSelector} from 'react-redux'
import {listProjects} from '../actions/projectActions'

import Separator from '../components/Separator.jsx'
import ProjectCard from '../components/ProjectCard.jsx'
import Loader from '../components/Loader.jsx'
import Message from '../components/Message.jsx'
import Filter from '../components/Filter.jsx'
import Footer from '../components/Footer.jsx'
import Meta from '../components/Meta.jsx'
import Arrows from '../components/Arrows.jsx'

import styled from 'styled-components'
import styles from '../css/PortfolioPageStyles.module.css'

const PortfolioPage = () => {

    const dispatch = useDispatch()

    const projectList = useSelector(state => state.projectList)
    const {loading, error, projects} = projectList

    const filterProjects = useSelector(state => state.filterProjects)
    const {error:filterError, projects:filteredProjects, loading: filterLoading} = filterProjects

    useEffect(() => {
        dispatch(listProjects())
    }, [dispatch])

    return (
        <>
        <Meta title={'Web Developer Portfolio | Jozef Müller'}/>
        <Arrows linkRight={'/contact'} labelRight={'contact'} linkLeft={'/'} labelLeft={'home'}/>
        <Portfolio>    
                <div id="quitFadeUp" className={styles.typewriter} >
                    <h1 className={styles.portfolio_heading}>MY PORTFOLIO</h1>
                </div>
                <Separator />
                {/* show filter after projects are loaded */}
                {!loading && <Filter projects={projects}/>}

            {/* show sentence of how many projects are showing and which category they are filtered by */}
            {(!loading && filteredProjects.length !== 0) ? (
                <p id="quitFadeUp" className={styles.filterState}>
                    Showing <strong style={{fontWeight: 900}}>{filteredProjects.data.length}</strong>
                    {` ${filteredProjects.data.length !== 1 ?
                     'projects' : 'project'} `}
                     filtered by <strong style={{fontWeight: 900}}>{filteredProjects.category}</strong>
                </p>
            ): !loading && (
                <p id="quitFadeUp" className={styles.filterState}>Showing <strong style={{fontWeight: 600}}>ALL</strong> projects, use filter to list them by specific technology.</p>
            )}

            {/* projects list     */}
            <div id="quitFadeDown" className={styles.projects_conteiner} >
                {/* if it is loading show loader else if there is error or filter error and filtered projects doesnt exist list projects */}
                {(loading || filterLoading) ? <Loader /> : (error || filterError) ? <Message>{error}</Message> :  
                    filteredProjects.length === 0 ? 
                            projects.map((project,id) => (
                                <ProjectCard key={id} project={project} animationOrder={id}/>  
                            ))  
                    // else list filtered projects
                    : filteredProjects.length !== 0 &&
                        filteredProjects.data.map((project,id) => (
                            <ProjectCard key={id} project={project} animationOrder={id}/>  
                        )) 
                }
            </div>
            {/* if not loading show footer */}
            {!loading && <Footer/>}
        </Portfolio>
        </>
    )
}

const Portfolio = styled.div`
  min-height: 100vh;
  background-color: #2f2f2f;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  flex-direction: column;
  overflow: hidden;
  padding-top: 125px;
  
`

export default PortfolioPage
