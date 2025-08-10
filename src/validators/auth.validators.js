"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userAssignRoleValidator = exports.userResetForgottenPasswordValidator = exports.userRegisterValidator = exports.userLoginValidator = exports.userForgotPasswordValidator = exports.userChangeCurrentPasswordValidator = void 0;
var express_validator_1 = require("express-validator");
var Constants_1 = require("../utils/Constants");
var userRegisterValidator = function () {
    return [
        (0, express_validator_1.body)("email")
            .trim()
            .notEmpty()
            .withMessage("Email is required")
            .isEmail()
            .withMessage("Email is invalid"),
        (0, express_validator_1.body)("username")
            .trim()
            .notEmpty()
            .withMessage("Username is required")
            .isLowercase()
            .withMessage("Username must be lowercase")
            .isLength({ min: 3 })
            .withMessage("Username must be at lease 3 characters long"),
        (0, express_validator_1.body)("password").trim().notEmpty().withMessage("Password is required"),
        (0, express_validator_1.body)("fullName")
            .optional()
            .trim()
            .notEmpty()
            .withMessage("Full name is required"),
    ];
};
exports.userRegisterValidator = userRegisterValidator;
var userLoginValidator = function () {
    return [
        (0, express_validator_1.body)("email").optional().isEmail().withMessage("Email is invalid"),
        (0, express_validator_1.body)("username").optional(),
        (0, express_validator_1.body)("password").notEmpty().withMessage("Password is required"),
    ];
};
exports.userLoginValidator = userLoginValidator;
var userChangeCurrentPasswordValidator = function () {
    return [
        (0, express_validator_1.body)("oldPassword").notEmpty().withMessage("Old password is required"),
        (0, express_validator_1.body)("newPassword").notEmpty().withMessage("New password is required"),
    ];
};
exports.userChangeCurrentPasswordValidator = userChangeCurrentPasswordValidator;
var userForgotPasswordValidator = function () {
    return [
        (0, express_validator_1.body)("email")
            .notEmpty()
            .withMessage("Email is required")
            .isEmail()
            .withMessage("Email is invalid"),
    ];
};
exports.userForgotPasswordValidator = userForgotPasswordValidator;
var userResetForgottenPasswordValidator = function () {
    return [(0, express_validator_1.body)("newPassword").notEmpty().withMessage("Password is required")];
};
exports.userResetForgottenPasswordValidator = userResetForgottenPasswordValidator;
var userAssignRoleValidator = function () {
    return [
        (0, express_validator_1.body)("role")
            .isIn(Constants_1.AvailableUserRoles)
            .withMessage("Invalid user role"),
    ];
};
exports.userAssignRoleValidator = userAssignRoleValidator;
