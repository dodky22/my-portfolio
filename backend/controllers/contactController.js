import nodemailer from 'nodemailer'

// @desc post mail 
// @route post /api/contact
// @access public
export const postMail = (req, res) => {
  
  // Instantiate the SMTP server
  const smtpTrans = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS
    }
  })
    //VERIFY CONNECTION

     //smtpTrans.verify((error, success) => {
     //if (error) {
     //  console.log(error);
     //} else {
     //  console.log('All works fine, congratz!');
     //}
     // });

  // Specify what the email will look like
  const mailOpts = {
    from: 'Your sender info here', // This is ignored by Gmail
    to: process.env.GMAIL_USER,
    subject: 'New message from contact form at my portfolio',
    text: `${req.body.name} (${req.body.email}) says: ${req.body.message}`
  }

  // Attempt to send the email
  smtpTrans.sendMail(mailOpts, (error, response) => {
    if (error) {
        res.json({status: "fail"})
    //   res.render('contact-failure') // Show a page indicating failure
    }
    else {
        res.json({status: "success"})
    //   res.render('contact-success') // Show a page indicating success
    }
  })
}