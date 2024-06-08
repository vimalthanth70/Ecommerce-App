import nodemailer from 'nodemailer'


  export async function sendMailFromGmail(toMail:string,subject:string,html:string) {
    const transporter = nodemailer.createTransport({
        service:"gmail",
        host: "smtp.gmail.com",
        port: 465,
        secure: true, // Use `true` for port 465, `false` for all other ports
        auth: {
          // eslint-disable-next-line turbo/no-undeclared-env-vars
          user: process.env.USER_EMAIL,
          // eslint-disable-next-line turbo/no-undeclared-env-vars
          pass: process.env.USER_EMAIL_PASSWORD,
        },
      });
    // send mail with defined transport object
    const info = await transporter.sendMail({
      from: {
        name:"Ecommerce App",
        // eslint-disable-next-line turbo/no-undeclared-env-vars
        address:process.env.USER_EMAIL || ""
      }, // sender address
      to: toMail, // list of receivers
      subject: subject, // Subject line
      text:"Hello There",
      html: html, // html body
    });
  
    console.log("Message sent: %s", info.messageId);
    // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
  }