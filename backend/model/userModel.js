import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';
const userSchema = mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    }
},
{
    timestamps: true
});

//hashage du mot de passe de l'utilisateur avant la sauvegarde dans la bd

userSchema.pre('save',async function(next){
    if(!this.isModified('password')){
        next();
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

//verification du mot de passe de l'utilisateur avant connexion
userSchema.methods.matchPassword= async function (enterPassword){
    return await bcrypt.compare(enterPassword, this.password); 
}

const User = mongoose.model('User', userSchema);

export default User;