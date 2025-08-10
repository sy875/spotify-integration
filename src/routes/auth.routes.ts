import { Router } from "express";
import passport from "passport";
import {
  assignRole,
  changeCurrentPassword,
  forgetPasswordRequest,
  getCurrentUser,
  handleSocialLogin,
  login,
  logout,
  refreshAccessToken,
  resendEmailVerification,
  resetPassword,
  signup,
  verifyEmail,
} from "../controllers/auth.controllers.js";
import {
  userAssignRoleValidator,
  userChangeCurrentPasswordValidator,
  userForgotPasswordValidator,
  userLoginValidator,
  userRegisterValidator,
  userResetForgottenPasswordValidator,
} from "../validators/auth.validators.js";
import { validate } from "../validators/validate.js";
import { verifyJWT, verifyPermission } from "../middleware/auth.middleware.js";
import { UserRolesEnum } from "../utils/Constants.js";
import { mongodIdPathVariableValidator } from "../validators/common/mongodb.validators.js";
//import passport config
import "../passport/index.js";
const router = Router();

router.route("/signup").post(userRegisterValidator(), validate, signup);
router.route("/login").post(userLoginValidator(), validate, login);

router.route("/logout").get(verifyJWT, logout);
router.route("/refresh-access-token").get(refreshAccessToken);

router
  .route("/resend-email-verification")
  .post(verifyJWT, resendEmailVerification);

router.route("/verify-email/:verificationToken").get(verifyJWT, verifyEmail);

router
  .route("/forgot-password")
  .post(
    verifyJWT,
    userForgotPasswordValidator(),
    validate,
    forgetPasswordRequest
  );

router
  .route("/reset-password/:resetToken")
  .post(userResetForgottenPasswordValidator(), validate, resetPassword);

router
  .route("/change-password")
  .post(
    verifyJWT,
    userChangeCurrentPasswordValidator(),
    validate,
    changeCurrentPassword
  );

router.route("/assign-role/:userId").post(
  verifyJWT,
  // verifyPermission([UserRolesEnum.ADMIN]),
  mongodIdPathVariableValidator("userId"),
  userAssignRoleValidator(),
  validate,
  assignRole
);

router.route("/current-user").get(verifyJWT, getCurrentUser);

// SSO routes
router.route("/google").get(
  passport.authenticate("google", {
    scope: ["profile", "email"],
  }),
  (req, res) => {
    res.send("redirecting to google...");
  }
);

  router.route("/spotify").get(
    passport.authenticate("spotify", {
      scope: [
        "user-read-email",
        "user-read-private",
        "user-read-currently-playing",
        "user-read-playback-state",
        "user-modify-playback-state",
        "user-top-read",
        "user-follow-read",
      ],
    })
  );

  router.route("/github").get(
    passport.authenticate("github", {
      scope: ["profile", "email"],
    }),
    (req, res) => {
      res.send("redirecting to github...");
    }
  );

  router
    .route("/google/callback")
    .get(passport.authenticate("google"), handleSocialLogin);

  router
    .route("/github/callback")
    .get(passport.authenticate("github"), handleSocialLogin);
  router
    .route("/spotify/callback")
    .get(passport.authenticate("spotify"), handleSocialLogin);

export default router;
