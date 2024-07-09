import { connect } from "@/dbConfig/dbConfig";
import User from '@/models/userModel'
import {NextRequest, NextResponse} from 'next/server'
import bcryptjs from 'bcryptjs'
import {sendEmail} from '@/helpers/mailer'

connect()

export async function POST( request : NextRequest){
    try {
        const reqBody = await request.json()
        const {userName, email, password} = reqBody;
        // Validation
        console.log(reqBody);
        
        const user = await User.findOne({email})

        if(user){
            console.log('User already exists:', user);
            return NextResponse.json({error: "User already exists"}, {status : 400})
        }

        const salt = await bcryptjs.genSalt(10);

        const hashedPassword = await bcryptjs.hash(password, salt)

        const newUser = new User({
            userName,
            email,
            password: hashedPassword
        })

        const savedUser = await newUser.save()

        console.log(savedUser);
        
        //Send Verification mail

         await sendEmail({email, emailType:"VERIFY", userId : savedUser._id})

         return NextResponse.json({
            message : "User registered successfully",
            success : true,
            savedUser
         })

    } catch (error : any) {
        return NextResponse.json({error : error.message}, {status: 500})
        
    }
}