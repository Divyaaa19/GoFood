const express=require('express')
const router =express.Router()
const User=require('../models/User')
const {body, validationResult}= require('express-validator')
const jwt= require("jsonwebtoken")
const bcrypt=require("bcryptjs")
const jwtSecret= "iamtheonlyonehere"

router.post("/createuser",
    body('email').isEmail().withMessage('Please enter a valid email'),
    body('name').isLength({ min: 5 }).withMessage('Name should be at least 5 characters long'),
    body('password').isLength({ min: 5 }).withMessage('Password should be at least 5 characters long'),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        

        const salt= await bcrypt.genSalt(10);
        let secPassword= await bcrypt.hash(req.body.password, salt)


        try {
            await User.create({
                name: req.body.name,
                password: secPassword,
                email: req.body.email,
                location: req.body.location
            });
            res.json({ success: true });
        } catch (error) {
            console.error(error);
            res.status(500).json({ success: false, error: 'Internal Server Error' });
        }
    });



    router.post("/loginuser",
        body('email').isEmail().withMessage('Please enter a valid email'),
        body('password').isLength({ min: 5 }).withMessage('Password should be at least 5 characters long'),
        async (req, res) => {

            const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

            let email=req.body.email;
            try {
             let userData = await User.findOne({email:email});
             if(!userData){
                return res.status(400).json({ errors: "Try logging in with correct credentials" });
             }

             const pwdCompare= await bcrypt.compare(req.body.password,userData.password);
             if(!pwdCompare){
                return res.status(400).json({ errors: "Try logging in with correct credentials" });
             }

             const data={
                user:{
                    id:userData.id 
                }
             }


             const authToken= jwt.sign(data,jwtSecret)
             return res.json({success:true,authToken :authToken })
            } catch (error) {
                console.error(error);
                res.status(500).json({ success: false, error: 'Internal Server Error' });
            }
        });
    

module.exports=router;



