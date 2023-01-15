const dbConfig = require("../../mysql_connection");
require("dotenv").config({path: "../../.env"});

const ERROR_CONNECTING = "Error connecting to the server!"
const ERROR_INVALID_ITEM_CODE = "Item code already exists!"

// create new item
exports.createItem = function(req, res, next){
    let itemcode = req.body.itemcode;
    let itemname = req.body.itemname;
    let itemprice = req.body.itemprice;

    let _query_1 = "SELECT * FROM item WHERE itemcode=?"
    let _query_2 = "INSERT INTO item(itemcode, itemname, itemprice) VALUES (?,?,?)"
    dbConfig.query(_query_1, [itemcode], (err, rows)=>{
        if(err){
            console.log(ERROR_CONNECTING)
            return res.status(500).send({success: false, message: ERROR_CONNECTING});
        } else {
            if(rows[0]!=null){
                return res.status(401).send({success: false, message:ERROR_INVALID_ITEM_CODE});
            }else{
                if(rows[0]!=null){
                    dbConfig.query(_query_2,[itemcode, itemname, itemprice], (err, rows)=>{
                        if(err){
                            return res.status(500).send({success: false, message: ERROR_CONNECTING});
                        } else {
                            return res.status(201).send({success: true, data:{itemcode: itemcode, itemname: itemname, itemprice: itemprice, message: 'Item successfully added!'}})
                        }
                    })
                }
            }
        }
    })
}