
const db = require('../db')



const login = async (req, res, next) => {
    try {
      const validationErrors = validationResult(req);
      if (!validationErrors.isEmpty()) {
        return res.status(404).send(validationErrors.array()[0].msg);
      } else {
        await passport.authenticate('local')(req, res, next);
      }
    } catch (err) {
      res.status(500).send(err);
    }
  };


  
 const loginSuccess = async (req, res, next) => {
  try {
    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {
      return res.status(404).send(validationErrors.array()[0].msg);
    } else {
      await passport.authenticate('local')(req, res, next);
    }
  } catch (err) {
    res.status(500).send(err);
  }
};

module.exports = {login,loginSuccess}