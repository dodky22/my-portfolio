
import bcrypt from 'bcryptjs'

const users = [
    {
        name: 'Jozef Müller',
        email: 'dodkymull@gmail.com',
        password: bcrypt.hashSync('vajco161993', 10),
        isAdmin: true
    }
]

export default users