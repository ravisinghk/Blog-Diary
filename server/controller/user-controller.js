import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
// import { response } from 'express';

import User from "../model/user.js";
import Token from '../model/token.js'

dotenv.config();

export const signupUser = async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const user = {...req.body, password: hashedPassword};
        const newUser = new User(user);
        await newUser.save();
        return res.status(200).json({msg : "SignUp Successfull"})
    } catch (error) {
        console.log("Error while Signing Up User ",error.message );
        return res.status(500).json({msg: "Error while Signing Up user"})
    }
}

export const loginUser = async (req, res) => {

    let user = await User.findOne({username: req.body.username});
    if(!user){
        return response.status(400).json({msg : "Username does not exists"});
    }

    try {
        let match = await bcrypt.compare(req.body.password, user.password);
        if(match){
            const accessToken = jwt.sign(user.toJSON(), process.env.ACCESS_SECRET_KEY, {expiresIn: '15m'})
            const refreshToken = jwt.sign(user.toJSON(), process.env.REFRESH_SECRET_KEY)

            const newToken = new Token({token : refreshToken})
            await newToken.save()

            return res.status(200).json({accessToken: accessToken, refreshToken: refreshToken, name: user.name, username: user.username})
        }
        else{
            return response.status(400).json({msg : "Incorrect Password"});
        }
    } 
    
    catch (error) {
        console.log("Error while Signing Up User ",error.message );
        return res.status(500).json({msg: "Error while logging in the user"})
    }
}


export const logoutUser = async (request, response) => {
    const token = request.body.token;
    await Token.deleteOne({ token: token });

    response.status(204).json({ msg: 'logout successfull' });
}