const nodemailer = require("nodemailer");
const smtpTransport = require("nodemailer-smtp-transport");
const dbConfig = require("../../mysql_connection");
require("dotenv").config({ path: "../../env" });

const ERROR_CONNECTING = "Error conneting to the server!"
const ERROR_SENDING_EMAIL = "Error sending mail to the given mail!"
const ERROR_INVALID_EMAIL = "Invalid email address!"
const ERROR_INVALID_CREDENTIALS = "Invalid credentials!"
const ERROR_USERNAME_ALREADY_EXISTS = "Username already exists!"
const ERROR_EMAIL_ALREADY_EXISTS = "email already exists!"

exports.signup = function (req, res, next) {
    let email = req.body.email;
    let password = req.body.password;
    let username = req.body.username;
    let fullname = req.body.fullname;

    let _query = "SELECT * FROM user WHERE username = ?";
    dbConfig.query(_query, [username], (err, rows) => {
        if (err) {
            console.log(ERROR_CONNECTING);
            return res.status(500).send({ success: false, message: ERROR_CONNECTING });
        } else {
            if (rows != null && rows.length!=0) {
                return res.status(401).send({ success: false, message: ERROR_USERNAME_ALREADY_EXISTS });
            } else {
                let _query_1 = "SELECT * FROM user WHERE email = ?";
                dbConfig.query(_query_1, [email], (err, rows) => {
                    if (err) {
                        console.log(ERROR_CONNECTING);
                        return res.status(500).send({ success: false, message: ERROR_CONNECTING });
                    } else {
                        if (rows != null && rows.length!=0) {
                            return res.status(401).send({ success: false, message: ERROR_EMAIL_ALREADY_EXISTS })
                        } else {
                            let _query_2 = "INSERT INTO user(username, fullname, email, password) VALUES (?,?,?,?)";
                            dbConfig.query(_query_2, [username, fullname, email, password], (err, rows) => {
                                if (err) {
                                    console.log(ERROR_CONNECTING);
                                    return res.status(500).send({ success: false, message: ERROR_CONNECTING })
                                } else {
                                    return res.status(201).send({ success: true, data: { email: email, password: password, username: username, message: "Account successfully created!" } })
                                }
                            });
                        }
                    }
                });
            }
        }
    });
};

exports.signin = function (req, res, next) {
    let username = req.body.username;
    let password = req.body.password;

    let _query = "SELECT * FROM user WHERE username = ? AND password = ?";
    dbConfig.query(_query, [username, password], (err, rows) => {
        if (err) {
            console.log(ERROR_CONNECTING)
            return res.status(500).send({ success: false, message: ERROR_CONNECTING })
        } else {
            try {
                if (rows != null && rows.length!=0) {
                    if (password === rows[0]['password']) {
                        return res.status(200).send({ success: true, message: "Login successful!" })
                    } else {
                        console.log(ERROR_INVALID_CREDENTIALS);
                        return res.status(401).send({ success: false, message: ERROR_INVALID_CREDENTIALS })
                    }
                } else {
                    console.log(ERROR_INVALID_CREDENTIALS);
                    return res.status(401).send({ success: false, message: ERROR_INVALID_CREDENTIALS })
                }
            } catch (e) {
                console.log(e);
                return res.status(401).send({ success: false, message: ERROR_INVALID_CREDENTIALS })
            }
        }
    });
};

exports.forgetPassword = function (req, res, next) {
    let email = req.body.email;

    let _query = "SELECT * FROM user WHERE email = ?";
    dbConfig.query(_query, [email], (err, rows) => {
        if (err) {
            console.log(ERROR_CONNECTING);
            return res.status(500).send({ success: false, message: ERROR_CONNECTING });
        } else {
            if (rows[0] != null) {
                let randomNo = Math.floor(10000 + Math.random() * 900000);
                let transporter = nodemailer.createTransport(smtpTransport({
                    service: "gmail",
                    host: "smtp.gmail.com",
                    auth: {
                        user: process.env.EMAIL,
                        pass: process.env.PASSWORD
                    }
                }));
                let mailOptions = {
                    from: process.env.EMAIL,
                    to: email,
                    subject: "Reset password of your Holux account.",
                    text: "Your six digit token: " + randomNo
                };
                let _query = "UPDATE user SET forgetPasswordNo = ? WHERE email = ?";
                dbConfig.query(_query, [randomNo, email], (err, rows) => {
                    if (err) {
                        console.log(ERROR_CONNECTING);
                        return res.status(500).send({ success: false, message: ERROR_CONNECTING });
                    } else {
                        transporter.sendMail(mailOptions, function (error, info) {
                            if (error) {
                                return res.status(404).send({ success: false, message: ERROR_SENDING_EMAIL })
                            } else {
                                return res.status(200).send({ success: true, data: { email: email, message: "Successfully send the mail!" } })
                            }
                        })
                    }
                })
            } else {
                console.log(ERROR_INVALID_EMAIL);
                return res.status(401).send({ success: false, message: ERROR_INVALID_EMAIL })
            }
        }
    })
}

exports.changePassword = function (req, res, next) {
    let username = req.body.username;
    let password = req.body.password;

    let _query = "UPDATE user SET password=? WHERE username=?";
    dbConfig.quert(_query, [password, username], (err, rows) => {
        if (err) {
            console.log(ERROR_CONNECTING);
            return res.status(500).send({ success: false, message: ERROR_CONNECTING })
        } else {
            return res.status(200).send({ success: true, data: { message: "Password succesfully changed!", username: username, password: password } });
        }
    })
}
