"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = void 0;
var express_validator_1 = require("express-validator");
var api_error_1 = require("../utils/api-error");
var validate = function (req, res, next) {
    var errors = (0, express_validator_1.validationResult)(req);
    if (errors.isEmpty()) {
        return next();
    }
    var extractedErrors = [];
    errors.array().map(function (err) {
        var _a;
        if (err.type == "field") {
            extractedErrors.push((_a = {}, _a[err.path] = err.msg, _a));
        }
    });
    throw new api_error_1.ApiError(422, "Received data is not valid", extractedErrors);
};
exports.validate = validate;
