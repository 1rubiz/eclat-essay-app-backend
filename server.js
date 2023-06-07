const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const app = express();
app.use(cors())
app.use(express.json())
dotenv.config();

const Host = process.env.HOST;
const Port = process.env.PORT;
const User = process.env.USER;
const Pass = process.env.PASS;
const Email = process.env.EMAIL;

const Data = {
	stats: ''
}
const mailer= async (email, mail, subject)=>{
	var transporter = nodemailer.createTransport({
		host: Host,
		port: Port,
		auth: {
		  user: User,
		  pass: Pass
		}
	  });
	  
	  var mailOptions = {
		from: email,
		to: Email,
		subject: subject,
		text: mail
	  };
	  
	  transporter.sendMail(mailOptions, function(error, info){
		if (error) {
		  console.log(error);
		  return false
		} else {
		  console.log('Email sent: ' + info.response);
		  return true;
		}
	  });

}
app.listen(3001,async ()=>{
	console.log('port 3001')
})

app.post('/mail', async (req, res)=>{
	console.log(req.body);
	const {exam, mail, Email, Phone, fullname} = req.body;
	const subject = `${exam} Essay by ${fullname}`;
	const newMail = `${mail} \n ${fullname} \n ${Phone} \n ${Email}`
	//await mailer(Email, newMail, subject);
console.log(req.body);
	res.sendStatus(200);
})

app.use((req, res) => {
	res.status(404).send('404 Page Not Found');
  });