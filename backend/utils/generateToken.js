
import jwt from 'jsonwebtoken';

//creation du token avec la jsonwebtoken 
const generateToken = (res, userId) => {
    const token = jwt.sign({userId}, process.env.JWT_SECRET_KEY,{
        expiresIn:'30d'
    });
    res.cookie('jwt' , token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development',
        sameSite:'strict',
        maxAge: 30 * 24 * 60 * 60 * 1000,
    });
}

export default generateToken;