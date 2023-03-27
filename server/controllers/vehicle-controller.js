const dbConfig = require('../../mysql_connection')
require('dotenv').config({ path: '../../env' })

const ERROR_CONNECTING = 'Error connecting to the server!'
const ERROR_VEHICLE_ALREADY_EXISTS =
  'Error vehicle registration number already exists!'

// add vehicle
exports.addVehicle = function (req, res, next) {
  let model = req.body.name
  let regNum = req.body.regNum

  let _query_1 = 'SELECT * FROM vehicles WHERE regNum =?'
  dbConfig.query(_query_1, [regNum], (err, rows) => {
    if (err) {
      console.log(ERROR_CONNECTING)
      return res.status(500).send({ success: false, message: ERROR_CONNECTING })
    } else {
      if (rows[0] != null) {
        return res
          .status(401)
          .send({ success: false, message: ERROR_VEHICLE_ALREADY_EXISTS })
      } else {
        let _query_2 = 'INSERT INTO vehicles(model, regNum) VALUES (?,?)'
        dbConfig.query(_query_2, [model, regNum], (err, rows) => {
          if (err) {
            console.log(ERROR_CONNECTING)
            return res
              .status(500)
              .send({ success: false, message: ERROR_CONNECTING })
          } else {
            res.status(201).send({
              success: true,
              data: { regNum: regNum, message: 'Vehicle successfully added!' }
            })
          }
        })
      }
    }
  })
}
