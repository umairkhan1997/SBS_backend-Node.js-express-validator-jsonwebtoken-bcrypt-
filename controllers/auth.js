




export const login = async (req, res, next) => {
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