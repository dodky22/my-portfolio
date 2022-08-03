import React, {useEffect, useState} from 'react';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios'

import {updateProject} from '../actions/projectActions'
import {PROJECTS_UPDATE_RESET, PROJECTS_DETAILS_RESET} from '../constants/projectConstants'

import Loader from './Loader'
import Message from './Message'

import styles from '../css/AdminStyles.module.css'
 
 const validate = values => {
   const errors = {};
//    if (!values.name) {
//      errors.name = 'Required';
//    } else if (values.firstName.length < 5) {
//      errors.firstName = 'Must be 5 characters or more';
//    }else if (values.firstName.length > 30){
//      errors.firstName = 'Too long';
//    }
 
   return errors
}
 
 const UpdateProjectForm = ({project, projectId, history}) => {
    const [uploading, setuploading] = useState(false)
    const [images, setImages] = useState([])

    const dispatch = useDispatch()

    const projectUpdate = useSelector(state => state.projectUpdate)
    const {success: successUpdate,loading: loadingUpdate, error:errorUpdate} = projectUpdate

    useEffect(() => {
        if(successUpdate){
            dispatch({type: PROJECTS_UPDATE_RESET})
            dispatch({type: PROJECTS_DETAILS_RESET})
            history.push('/admin/projects')
        }
    }, [successUpdate, dispatch, history])

   const formik = useFormik({
     initialValues: {
       name: project.name,
       shortDesc: project.shortDesc,
       url: project.url,
       codeUrl: project.codeUrl,
       description: project.description,
       technologies: project.technologies,
       status: project.status,
       imgs: project.imgs,
     },
     validate,
     onSubmit: values => {
        dispatch(updateProject({
            _id: projectId,
            name: values.name,
            shortDesc: values.shortDesc,
            url: values.url,
            codeUrl: values.codeUrl,
            description: values.description,
            status: values.status,
            technologies: values.technologies.toString().toUpperCase().split(','),
            imgs: images.length !== 0 ? images : project.imgs
            }))
     }
    });    

    const handleImageUpload = async(e) => {
        const files = e.target.files
        const formdata = new FormData()
        
            for (let i = 0; i < files.length; i++) {
                formdata.append('image', files[i])
            }

            setuploading(true)

        try {
            const config = {
                headers: {
                    'Content-type': 'multipart/form-data'
                }
            }

            const {data} = await axios.post('/api/upload', formdata, config)

            setImages(data)
            
            setuploading(false)
        } catch (error) {
            console.error(error)
            setuploading(false)
        }

    }
   return (
     <form onSubmit={formik.handleSubmit} className={styles.projectEditForm} >
            <div className={styles.projectEditFormGroup}>
                <label>NAME</label>
                <input
                    id="name"
                    name="name"
                    type="text"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.name}
                    placeholder="name"/>
                {formik.touched.name && formik.errors.name ? (
                    <span >{formik.errors.name}</span>
                ) : null}
            </div>
            
            <div className={styles.projectEditFormGroup}>
                <label>Short description</label>
                <textarea
                    id="shortDesc"
                    name="shortDesc"
                    type="textarea"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.shortDesc}
                    placeholder="Short description"
                    rows={5}
                />
                {formik.touched.shortDesc && formik.errors.shortDesc ? (
                    <span >{formik.errors.shortDesc}</span>
                ) : null}
            </div>
            <div className={styles.projectEditFormGroup}>
                <label>Description</label>
                <textarea
                    id="description"
                    name="description"
                    type="textarea"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.description}
                    placeholder="Description"
                    rows={15}
                />
                <span></span>
                {formik.touched.description && formik.errors.description ? (
                    <span >{formik.errors.description}</span>
                ) : null}
            </div>
        
            <div className={styles.projectEditFormGroup}>
                <label>Proejct URL</label>
                <input
                    id="url"
                    name="url"
                    type="text"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.url}
                    placeholder="NAME"/>
                {formik.touched.url && formik.errors.url ? (
                    <span >{formik.errors.url}</span>
                ) : null}
            </div>
            
            <div className={styles.projectEditFormGroup}>
                <label>Code URL <span>(default: "-")</span></label>
                <input
                    id="codeUrl"
                    name="codeUrl"
                    type="text"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.codeUrl}
                    placeholder="Code url"
                 />
                {formik.touched.codeUrl && formik.errors.codeUrl ? (
                    <span >{formik.errors.codeUrl}</span>
                ) : null}
            </div>
            
            <div className={styles.projectEditFormGroup}>
                <label>Project status</label>
                <select 
                    name="status" 
                    id="status"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.status}>
                    <option value="My Project">My Project</option>
                    <option value="Learning">Learning</option>
                </select>
                {formik.touched.status && formik.errors.status ? (
                    <span >{formik.errors.status}</span>
                ) : null}
            </div>

            <div className={styles.projectEditFormGroup}>
                <label>Technologies <span>(Separate with ",")</span></label>               
                 <input
                    id={`technologies`}
                    name="technologies"
                    type="text"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.technologies}
                    placeholder="Technology"
                   />
                {formik.touched.technologies && formik.errors.technologies ? (
                    <span >{formik.errors.technologies}</span>
                ) : null}
            </div>
            {/* <div className={styles.projectEditFormGroup}>
                <label>Images url<span>(Separate with ",")</span></label>
                <input
                    id="imgs"
                    name="imgs"
                    type="text"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.imgs}
                    placeholder="Images"
                   />
                {formik.touched.imgs && formik.errors.imgs ? (
                    <span >{formik.errors.imgs}</span>
                ) : null}
            </div> */}
            <div className={`${styles.projectEditFormGroup} ${styles.filegroup}`}>
                <label>Upload images</label>
                <input
                    id="image-files"
                    name="image-files"
                    type="file"
                    onChange={handleImageUpload}
                    placeholder="Upload images"
                    multiple
                    className={styles.file_input}
                   />
                    {uploading && <Loader />}
            </div>
            <div style={{width:'100%', alignItems:'center', justifyContent: 'center'}}>{loadingUpdate && <Loader />}</div>
            {errorUpdate && <Message>{errorUpdate}</Message>}
            <button type="submit" className={styles.updateButton}>UPDATE</button>  
     </form>
   );
 };

export default UpdateProjectForm
