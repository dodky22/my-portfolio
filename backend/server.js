import path from 'path'
import express from 'express'
import dotenv from 'dotenv'
import {notFound, errorHandler} from './middleware/errorMiddleware.js'

import connectDB from './config/db.js'
import ProjectRoutes from './routes/ProjectRoutes.js'
import UserRoutes from './routes/userRoutes.js'
import UploadRoutes from './routes/uploadRoutes.js'
import ContactRoutes from './routes/contactRoute.js'

dotenv.config()
//connect to DB
connectDB()
//initialize express
const app = express()
//allows us to use JSON with our requests to server
app.use(express.json())

//ROUTES
app.use('/api/projects', ProjectRoutes)
app.use('/api/users', UserRoutes)
app.use('/api/upload', UploadRoutes)
app.use("/api/contact", ContactRoutes);

// uploads isnt available by default so we have to make it static so it can be loaded in a browser
const __dirname = path.resolve()
// __dirname points to current directory (not evailable with ES modules only with common JS(require syntax))
// we can mimic it with path.resolve()
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

if(process.env.NODE_ENV === 'production'){
    app.use(express.static(path.join(__dirname, '/frontend/build')))

    app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html')))
}else{
    app.get('/', (req, res)=>{
        res.send('API IS RUNNING...')
    })
}

//MIDDLEWARES
app.use(notFound)
app.use(errorHandler)

//PORT from env or if not there use 5000
const PORT = process.env.PORT || 5000

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`))