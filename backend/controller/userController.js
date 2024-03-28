// pour eviter d'utiliser les fonction async avec async await Promesse on va utiliser la express-async-handler pour echapper au try-catch

import asyncHandler from 'express-async-handler';
import User from './../model/userModel.js';
import generateToken from './../utils/generateToken.js';

// @desc    Authentifications de l'utilisateur/ passage du token
// @router  POST /api/users/auth
// @modificateur d'access   public
const authUser = asyncHandler(async (req, res) => {
    const {email, password} = req.body;
    const user = await User.findOne({email});
    
    if(user && (await user.matchPassword(password))){
        generateToken(res, user._id); //recuperation du token
        res.status(201).json({ 
            _id: user._id,
            name:user.name,
            email:user.email
        });
    } else {
        res.status(401);
        throw new Error('Invalid email or password');
    }
});
// @desc    Enregistrememenet d'un utilisateur
// @router  POST /api/users
// @modificateur d'access   public
const registerUser = asyncHandler(async (req, res) => {
    //destructuration de la requete de l'utilisateur
    const {name, email, password } = req.body;


    const userExists = await User.findOne({ email})

    // si l'utilisateur existe alors on l'envoie un 400 bad request
    if(userExists){
        res.status(400);
        throw new Error('User already exists');
    }

    // creation de l'utilisateur
    const user = await User.create({
        name,
        email,
        password
    })

    if(user){
        generateToken(res, user._id); //recuperation du token
        res.status(201).json({ 
            _id: user._id,
            name:user.name,
            email:user.email
        });
    } else {
        res.status(400);
        throw new Error('Invalid user data ');
    }
});
// @desc    deconnexion d'un utilisateur
// @router  POST /api/users/logout
// @modificateur d'access   public
const logoutUser = asyncHandler(async (req, res) => {
    res.cookie('jwt', '', {
        httpOnly: true,
        expires: new Date(0),
    });

    res.status(200).json({ message: 'user logged out'});
});
// @desc    voir le profile de l'utilisateur
// @router  GET /api/users/profile
// @modificateur d'access   private
const getUserProfile = asyncHandler(async (req, res) => {
    const user = {
        _id: req.user._id,
        name: req.user.name,
        email: req.user.email,
        //avoir la date de creation du compte
        date: req.user.createdAt
    }
    res.status(200).json(user);
    console.log('Access granted');
});
// @desc    modifier le profile de l'utilisateur
// @router  PUT /api/users/profile
// @modificateur d'access   private
const updateUserProfile = asyncHandler(async (req, res) => {

    const user = await User.findById(req.user._id);

    if(user){
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        if(req.body.password){
            user.password = req.body.password ;
        }

        const updatedUser = await user.save();
        res.status(200).json({ 
            _id: updatedUser._id,
            name:updatedUser.name,
            email:updatedUser.email
        });
    } else {
        res.status(404);
        throw new Error('User not found');
    }
});


export {
    authUser, getUserProfile, logoutUser, registerUser, updateUserProfile
};

