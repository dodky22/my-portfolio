// import path from 'path'
// import express from 'express'
// import multer from 'multer'

// const router = express.Router()
// // https://www.npmjs.com/package/multer
// // dist storage from MULTER
// const storage = multer.diskStorage({
//     destination(req, file, cb) {
//         //  cb is callback (null means there is no error and uploads is our destination)
//         cb(null, 'uploads/')
//     },
//     filename(req, file, cb) {
//         // images will be named as "fieldname-date.extension"
//         cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`)
//     }
// })


// const checkFileType = (file, cb) => {
//     // filetypes we want
//     const fileTypes = /jpg|jpeg|png/
//     // testing extention if it is in our fileTypes
//     const extname = fileTypes.test(path.extname(file.originalname).toLowerCase())
//     // testing mimetype if it is in our fileTypes
//     const mimeType = fileTypes.test(file.mimeType)

//     // if both true then return no error else throw error
//     if(extname && mimeType){
//         return cb(null, true)
//     }else {
//         cb('Images only! (.jpg, .jpeg, .png)')
//     }
// } 

// const upload = multer({
//     storage,
//     //check files if they pass our checkfiletype function
//     fileFilter(req,file,cb){
//         checkFileType(file, cb)
//     }
// })

// router.post('/', upload.single('image'), (req, res) => {
//     console.log(req)
//     // const files = req.files 
//     // console.log(req.files);

//     // let filePaths = []
//     // files.map(file => {
//     //     filePaths.push(`/${file.path.replace(/\\/g, "/")}`) 
//     // })
//     // res.send(filePaths)
// })

// export default router
import path from 'path'
import express from 'express'
import multer from 'multer'

const router = express.Router()

const storage = multer.diskStorage({
    destination(req, file, cb){
        cb(null, 'uploads/')
    },
    filename(req, file, cb){
        cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`)
    }
    
})

function checkFileType(file, cb) {
    const filetypes = /jpg|jpeg|png/
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase())
    const mimetype = filetypes.test(file.mimetype)

    if(extname && mimetype){
        return cb(null, true)
    }else {
        cb('Images only!')
    }
}

const upload = multer({
    storage,
    fileFilter: function(req, file, cb){
        checkFileType(file, cb)
    }
})

router.post('/', upload.array('image'), (req, res) => {
    const files = req.files 

    let filePaths = []
    files.map(file => {
        filePaths.push(`/${file.path.replace(/\\/g, "/")}`) 
    })
    res.send(filePaths)     
})

export default router