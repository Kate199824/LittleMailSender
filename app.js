const express = require("express");
const app = express();
const nodemailer = require("nodemailer");

const bodyParser = require("body-parser");

app.use(bodyParser.json()); // for parsing application/json

let transporter = nodemailer.createTransport({
  host: "smtp.qq.com", //邮箱服务的主机，如smtp.qq.com
  port: "465", //对应的端口号
  //开启安全连接
  // secure: false,
  //secureConnection:false,
  //用户信息
  auth: {
    user: "598029681@qq.com",
    pass: "qhqjfemuziqkbehc"
  }
});

let mailOptions = {
  from: "598029681@qq.com", // sender address
  to: "598029681@qq.com", // list of receivers
  subject: "Hello", // Subject line
  // 发送text或者html格式
  text: "Hello 我是火星黑洞" // plain text body
  // html: "" // html body
};

app.post("/api/sendEmail", (request, response) => {
  console.log(request.body);
  const username = request.body.name;
  const userContent = request.body.content;
  mailOptions.subject = "客户咨询: " + username;
  mailOptions.text = userContent;
  // response.send("hello");
  transporter
    .sendMail(mailOptions)
    .then(res => {
      response.send("hello");
    })
    .catch(err => {
      response.send("bye");
    });
});

app.listen(3001, () => {
  console.log("Your little mail sender is listening on port 3001...");
});
