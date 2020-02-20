var router = express.Router();
import * as authController from './controllers/auth';

import {
    
    validateLoginEmail,
    validatePassword,
    
  } from '../middleware/validation-middleware';



  router.post(
    '/login',
    [validateLoginEmail, validatePassword],
    authController.login,
    authController.loginSuccess
  );

  export default router;