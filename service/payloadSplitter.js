
let gateHours = require("../gateHoursLogic/index");


const payloadSplitter = async (req, res, next) => {
  let postDataFromLambda = req.body;
  let response;
  try {
    if (postDataFromLambda.code == 1 ) {
      response = await gateHours(postDataFromLambda.code);
    } 
    
    response = Object.assign({}, response, postDataFromLambda);
    return res.status(200).json({ response });
  } catch (error) {
    response = Object.assign({}, error, postDataFromLambda);

    return res.status(400).json({ response });
  }
};

module.exports = payloadSplitter;
