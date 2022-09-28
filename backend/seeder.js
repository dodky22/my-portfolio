import mongoose from 'mongoose'
import dotenv from 'dotenv'
import users from './data/users.js'
// import projects from './data/projects.js'

import User from './models/userModel.js'

import connectDB from './config/db.js'

dotenv.config()

connectDB()

const importData = async () => {
    try {
        await User.deleteMany()

        await User.insertMany(users)

        console.log('data imported');
        process.exit()
    } catch (error) {
        console.log(`${error}`);
        process.exit(1)
    }
}

const destroyData = async () => {
    try {
        await User.deleteMany()

        console.log('data destroyed');
        process.exit()
    } catch (error) {
        console.log(`${error}`);
        process.exit(1)
    }
}


if(process.argv[2] === '-d'){
    destroyData()
}else{
    importData()
}


