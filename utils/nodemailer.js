const nodemailer = require("nodemailer")

const sendEmail = async(option)=>{
    //setup
    const transporter = nodemailer.createTransport({
        host : process.env.MAIL_HOST,
        port : process.env.MAIL_PORT,
        auth : {
            user : process.env.MAIL,
            pass : process.env.MAIL_PASS
        }
    })


    const mailOptions = {
        from : "TestingApp",
        to : option.email,
        subject : option.subject,
        text : option.message
    }
    //
    await transporter.sendMail(mailOptions);

}   

module.exports = sendEmail;