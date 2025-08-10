"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
var mongoose_1 = require("mongoose");
var api_error_1 = require("../utils/api-error");
var errorHandler = function (err, req, res, next) {
    var error = err;
    if (!(error instanceof api_error_1.ApiError)) {
        var statusCode = (error === null || error === void 0 ? void 0 : error.statusCode) || error instanceof mongoose_1.default.Error ? 400 : 500;
        var message = error.message || "Something went wrong";
        error = new api_error_1.ApiError(statusCode, message, (error === null || error === void 0 ? void 0 : error.errors) || [], err.stack);
    }
    var response = __assign(__assign(__assign({}, error), { message: error.message }), (process.env.NODE_ENV == "production" ? {} : { stack: error.stack }));
    var apiError = error;
    return res.status(Number(apiError.statusCode) || 500).json(response);
};
exports.errorHandler = errorHandler;
