const express = require("express");
const app = express();
const Service = require("../service/service");
const serviceInstance = new Service();
const { getToken, verifyToken } = require("../middleware/auth");
const Validations = require("../middleware/Validation");
const Handler = require("../serviceHandler");

//to ligin and get token for authorization
app.post("/login", verifyToken,
Validations.loginValidation,
 (req, res) => {
  const { email, password } = req.body;
  handler.serviceHandler(req, res, serviceInstance.register(email, password));
});

app.post(
  "/register",
  verifyToken,
  Validations.registerValidation,
  (req, res) => {
    const data = req.body;
    let handler = new Handler();
    handler.serviceHandler(req, res, serviceInstance.register(data));
  }
);


app.get(
  "/get-account-info/:user_id",
  verifyToken,
  Validations.accoutInfoValidation,
  (req, res) => {
    const { user_id } = req.param;
    let handler = new Handler();
    handler.serviceHandler(req, res, serviceInstance.getUserInfo(req.params.user_id));
  }
);

app.post(
  "/forgot-password",
  verifyToken,
  Validations.forgotPassValidation,
  (req, res) => {
    const {token} = req.headers
    const {new_password} = req.body;
    let handler = new Handler();
    handler.serviceHandler(req, res, serviceInstance.resetpassword(token,new_password));
  }
);
app.post(
  "/update-account",
  verifyToken,
  Validations.updateAccValidation,
  (req, res) => {
    const data = req.body;
    let handler = new Handler();
    handler.serviceHandler(req, res, serviceInstance.updateAccount(data));
  }
);

app.post(
  "/update-password",
  verifyToken,
  Validations.updatePassValidation,
  (req, res) => {
    const { old_password, new_password, user_id } = req.body;
    let handler = new Handler();
    handler.serviceHandler(
      req,
      res,
      serviceInstance.updatePassword(old_password, new_password, user_id)
    );
  }
);

module.exports = app;
