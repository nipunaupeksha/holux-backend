const dbConfig = require("../../mysql_connection");
require("dotenv").config({ path: "../../env" });

const ERROR_CONNECTING = "Error connecting to the server!"

// outlet registration
exports.createOutlet = function (req, res, next) {
    let name = req.body.name;
    let address = req.body.address;
    let telephone = req.body.telephone;

    let _query = "INSERT INTO outlet(outletname, address, telephone) VALUES (?,?,?)";
    dbConfig.query(_query, [name, address, telephone], (err, rows) => {
        if (err) {
            console.log(ERROR_CONNECTING);
            return res.status(500).send({ success: false, message: ERROR_CONNECTING });
        } else {
            res.status(201).send({ success: true, data: { name: name, message: "Outlet successfully created!" } });
        }
    })
}

// get all outlets
exports.getOutlets = function (req, res, next) {
    let _query = "SELECT * FROM outlet";
    dbConfig.query(_query, (err, rows) => {
        if (err) {
            console.log(ERROR_CONNECTING);
            return res.status(500).send({ success: false, message: ERROR_CONNECTING });
        } else {
            if (rows[0] != null) {
                return res.status(200).send({ success: true, data: rows })
            } else {
                return res.status(200).send({ success: true, data: [] })
            }
        }
    })
}