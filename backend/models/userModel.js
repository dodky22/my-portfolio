import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        required: true,
        default: false
    }
},{
    timestamps : true,
})

// mongoose method to chech if passwords are matching on auth user (on login)...
// used in userController (takes in the password that user has typed in)
userSchema.methods.matchPassword = async function (enteredPassword) {
    // this method bcryp.tcompare compares pass that user typed in with pass that has the user that was found by
    // email in userController 
    return await bcrypt.compare(enteredPassword,this.password)
}
// pre save hash the password but only if it has been modified, meaning that when we will update email name etc.
// but not the password this will not run
userSchema.pre('save', async function(next){
    if (!this.isModified('password')) {
        next()
    }

    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})

const User = mongoose.model('User', userSchema);

export default User