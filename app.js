const express = require("express");
const nodemailer = require("nodemailer");
const { engine } = require("express-handlebars");
const path = require("path");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Static folder
app.use(express.static(path.join(__dirname, "public")));

// View engine setup
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./views");

app.get("/", (req, res) => {
  res.render("contact");
});
app.post("/send", (req, res) => {
  const output = `
  <div style="text-align:center;">
  <p style="color:red;">You have a new contact request</p>
  <h3 style="color:blue;">Contact Details</h3>
 
  <ul style="list-style:none;">
  <li>Name : ${req.body.name}</li>
  <li>Company : ${req.body.company}</li>
  <li>Email : ${req.body.email}</li>
  <li>Phone : ${req.body.phone}</li>
  <h3>Message</h3>
  <p>${req.body.message}</p>
  </div>
  `;
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "mohamedtaher.benarbia@gmail.com",
      pass: "ipolygqclcvkgzjk"
    }
  });
  var mailOptions = {
    from: "mohamedtaher.benarbia@gmail.com",
    to: "benarbiamohamed84@gmail.com",
    subject: "Sending Email using Node.js",
    html: output
  };
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
      res.render("contact", { msg: "Email has been send" });
    }
  });
});

app.listen(5000, () => console.log("server running on port 5000"));
