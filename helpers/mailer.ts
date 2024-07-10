import User from '@/models/userModel';
import nodemailer from 'nodemailer'
import bcryptjs from 'bcryptjs'

export const sendEmail = async ({email, emailType, userId}: any)=>{
    try {
       const hashedToken =  await bcryptjs.hash(userId.toString(), 10)

        if(emailType === "VERIFY"){
          await User.findByIdAndUpdate(userId, 
            {$set : {verifyToken : hashedToken, verifyTokenExpiry: Date.now() + 3600000},}
          )
        } else if(emailType === "RESET"){
          await User.findByIdAndUpdate(userId, 
            {$set :{forgotPasswordToken : hashedToken, forgotPasswordTokenExpiry: Date.now() + 3600000},}
          )
        }

        const transporter = nodemailer.createTransport({
          host: "sandbox.smtp.mailtrap.io",
          port: 2525,
          auth: {
            user: "3820f2755bb1b6",
            pass: "9f88e5e26766de"
          }
        });


          const mailOptions = {
            from: '"ankit@ankit.ai', // sender address
            to: email, 
            subject: emailType === 'VERIFY' ? "Verify your email" : "Reset your password", // Subject line
            html: emailType === 'VERIFY' ? `
              <p>Dear User,</p>
              <p>Thank you for registering with us. Please verify your email address by clicking the link below:</p>
              <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">Verify your email</a>
              <p>This link will expire in 1 hour.</p>
              <p>If you did not create an account, please ignore this email.</p>
              <p>Best regards,</p>
              <p>Ankit</p>
    ` : `
          <p>Dear User,</p>
          <p>We received a request to reset your password. You can reset your password by clicking the link below:</p>
          <a href="">Reset your password</a>
          <p>This link will expire in 1 hour.</p>
          <p>If you did not request a password reset, please ignore this email.</p>
          <p>Best regards,</p>
          <p>Ankit</p>
    `,
          }

          const mailResponse = await transporter.sendMail(mailOptions)
          return mailResponse
    } catch (error:any) {
        throw new Error(error.message)
    }
}