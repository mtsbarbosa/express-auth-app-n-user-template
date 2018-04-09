var express = require('express');
var router = express.Router();
var user_controller = require('../controllers/user');

/* GET users listing. */
router.post('/authenticate/', async(req, res, next) => {
  try{
    var token = await user_controller.login(req.body.email, req.body.password);
    if(token == null){
      console.log('err',err);
      res.status(500).json({ success: false, message: 'Internal Error' });
    }
    res.json({
      success: true,
      message: 'The token for your user is here',
      me: token
    });
  }catch(err){
    if(err instanceof validator.ParamNotFoundError
        || err instanceof error.IdFormatError){
      res.status(400).json({ success: false, message: err.message });
    }else if(err instanceof error.NotFoundError){
      res.status(404).json({ success: false, message: err.message });
    }else{
      console.log('err',err);
      res.status(500).json({ success: false, message: 'Internal Error' });
    }
  }
});

module.exports = router;
