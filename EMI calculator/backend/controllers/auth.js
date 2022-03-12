import User from '../models/user'
import jsonwebtoken from 'jsonwebtoken';
import { Router } from 'express';

export const register = async (req, res) =>{
    console.log(req.body);
    const {name, email, password} = req.body;
    // validation
    if(!name) return res.status(400).send('Name is required');
    if(!password || password.length < 6) 
    return res
        .status(400)
        .send('Password is required and should be minimum 6 char long');
    let userExist = await User.findOne({email}).exec()
    if(userExist) return res.status(400).send('Email is taken')
    //register
    const user = new User(req.body)
    try{
        await user.save()
        console.log('USER CREATED', user)
        return res.json({ ok : true });

    }catch(err){
        console.log("CREATE USER FAILED", err)
        return res.status(400).send('Error. Try again.')
    }
};  

export const login = async(req, res) => {
    // console.log(req.body);
    const {email, password} = req.body
    try{
        //check if user with that email exist
        let user = await User.findOne({email}).exec();

        // let admin =  await User
        // console.log('USER EXIST', user);
        if(!user) res.status(400).send('User with that email not found');
        //compare password
        user.comparePassword(password, (err, match) => {
            console.log('COMPARE PASSWORD IN LOGIN ERR', err);
            if(!match || err) return res.status(400).send("Wrong password");
            //"GENERATE A TOKEN THEN SEND AS RESPONSE TO CLIENT"
            let token = jsonwebtoken.sign({_id: user._id}, process.env.JWT_SECRET,{
                expiresIn: '30d',
            });
            res.json({token, user:{
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin:user.isAdmin,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt,
            },
         });

        });
    }catch(err){
        console.log("LOGIN ERROR", err);
        res.status(400).send("SIGNIN FAILED");
    }
};
 
export const users =() =>{
    Router.get('/users',async(req, res)=>{
        const UserS = await User.find();
        console.log(UserS)
        res.json(UserS);
    })
    
}

