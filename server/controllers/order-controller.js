const dbConfig = require("../../mysql_connection");
require("dotenv").config({ path: "../../env" });

const ERROR_CONNECTING = "Error connecting to the server!"

// create order
exports.createOrder = function (req, res, next) {
    let description = req.body.description;
    let amount = req.body.amount;
    let userid = req.body.userid;
    let customerid = req.body.customerid;
    let outletid = req.body.outletid;

    let _query = "INSERT INTO orders(orderts, description, amount, userid, customerid, outletid) VALUES (now(),?,?,?,?,?)";
    dbConfig.query(_query, [description, amount, userid, customerid, outletid], (err, rows) => {
        if (err) {
            console.log(ERROR_CONNECTING);
            return res.status(500).send({ success: false, message: ERROR_CONNECTING })
        } else {
            return res.status(201).send({ success: true, data: { message: "Order successfully created!" } })
        }
    })
}

// get daily orders
exports.getDailyOrders = function (req, res, next) {
    let date = '%' + req.body.date + '%';

    let _query = "select o.orderid, o.orderts, o.description, o.amount, u.fullname, c.custname, ou.outletname from orders o inner join customer c on o.customerid=c.customerid inner join outlet ou on o.outletid=ou.outletid inner join user u on o.userid=u.userid where o.orderts like ?";
    dbConfig.query(_query, [date], (err, rows) => {
        if (err) {
            console.log(err);
            console.log(ERROR_CONNECTING);
            return res.status(500).send({ success: false, message: ERROR_CONNECTING })
        } else {
            if (rows[0] != null) {
                return res.status(200).send({ success: true, data: rows });
            } else {
                return res.status(200).send({ success: true, data: [] });
            }
        }
    })
}

// get outlet orders
exports.getOutletOrders = function (req, res, next) {
    let outletId = req.body.id;

    let _query = "SELECT * FROM orders where outletid=?";
    dbConfig.query(_query, [outletId], (err, rows) => {
        if (err) {
            console.log(ERROR_CONNECTING);
            return res.status(500).send({ success: false, message: ERROR_CONNECTING });
        } else {
            if (rows[0] != null) {
                return res.status(200).send({ success: true, data: rows });
            } else {
                return res.status(200).send({ success: true, data: [] });
            }
        }
    })
}

// get outlet wise daily orders
exports.getOutletDailyOrders = function (req, res, next) {
    let outletId = req.body.id;
    let date = '%' + req.body.date + '%';

    let _query = "SELECT * FROM orders where outletid=? and orderts like ?";
    dbConfig.query(_query, [outletId, date], (err, rows) => {
        if (err) {
            console.log(ERROR_CONNECTING);
            return res.status(500).send({ success: false, message: ERROR_CONNECTING });
        } else {
            if (rows[0] != null) {
                return res.status(200).send({ success: true, data: rows });
            } else {
                return res.status(200).send({ success: true, data: [] })
            }
        }
    })
}

// get monthly sales
exports.getAnnualSales = function (req, res, next) {
    let _query = "select year(orderts) as year,month(orderts) as month,sum(amount) as sum from orders group by year(orderts),month(orderts) order by year(orderts),month(orderts)"
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