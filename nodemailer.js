var nodemailer = require("nodemailer");

function mailNotifications(targetEmail, mentioner, urlLink) {

  var smtpTransport = nodemailer.createTransport({
      service: "gmail",
      auth: {
          user: "dummymamant@gmail.com",
          pass: "mamantmemangganteng"
      }
  });
  
  // setup e-mail data with unicode symbols
  var mailOptions = {
      from: "dummymamant@gmail.com", // sender address
      to: targetEmail, // list of receivers
      subject: `${mentioner} Mention You On Chánchán ✔`, // Subject line
      text: `${mentioner} Mention You On Chánchán`, // plaintext body
      html: `<b>Click <a href="${urlLink}">here</a> to see the post. ✔</b>` // html body
  }
  
  // send mail with defined transport object
  smtpTransport.sendMail(mailOptions, function(error, response){
      if(error){
          console.log(error);
      }else{
          console.log(response)
          console.log("Message sent... ✔");
      }
  
      // if you don't want to use this transport object anymore, uncomment following line
      //smtpTransport.close(); // shut down the connection pool, no more messages
  });
}

module.exports = mailNotifications

// mailNotifications("rahman.hasri@gmail.com", 'celyn', "http://google.com")