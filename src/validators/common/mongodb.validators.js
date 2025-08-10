"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mongoIdRequestBodyValidator = exports.mongodIdPathVariableValidator = void 0;
var express_validator_1 = require("express-validator");
/**
 *
 * @param {string} idName
 * @description validators to validated mongodb id passed in params
 */
var mongodIdPathVariableValidator = function (idName) {
    return [
        (0, express_validator_1.param)(idName).notEmpty().isMongoId().withMessage("Invalid ".concat(idName)),
    ];
};
exports.mongodIdPathVariableValidator = mongodIdPathVariableValidator;
/**
 * @param {string} idName
 * @description a common validator to validate mongodb id passed in body
 */
var mongoIdRequestBodyValidator = function (idName) {
    return [(0, express_validator_1.body)(idName).notEmpty().isMongoId().withMessage("Invalid ".concat(idName))];
};
exports.mongoIdRequestBodyValidator = mongoIdRequestBodyValidator;
