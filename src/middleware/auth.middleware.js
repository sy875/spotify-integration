"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyPermission = exports.verifyJWT = void 0;
var async_handler_1 = require("../utils/async-handler");
var api_error_1 = require("../utils/api-error");
var jsonwebtoken_1 = require("jsonwebtoken");
var user_models_1 = require("../models/user.models");
/**
 * @description This middleware is responsible for validating access token
 */
exports.verifyJWT = (0, async_handler_1.asyncHandler)(function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var token, decodedToken, user, error_1;
    var _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                token = ((_a = req.cookies) === null || _a === void 0 ? void 0 : _a.accessToken) ||
                    ((_b = req.header("Authorization")) === null || _b === void 0 ? void 0 : _b.replace("Bearer ", ""));
                if (!token) {
                    throw new api_error_1.ApiError(401, "Unauthorized request");
                }
                _c.label = 1;
            case 1:
                _c.trys.push([1, 3, , 4]);
                decodedToken = jsonwebtoken_1.default.verify(token, process.env.ACCESS_TOKEN_SECRET);
                return [4 /*yield*/, user_models_1.User.findById(decodedToken._id).select("-password,-refreshToken -emailVerificationToken -emailVerificationExpiry")];
            case 2:
                user = _c.sent();
                if (!user) {
                    throw new api_error_1.ApiError(401, "Invalid Access Token");
                }
                req.user = user;
                next();
                return [3 /*break*/, 4];
            case 3:
                error_1 = _c.sent();
                throw new api_error_1.ApiError(401, error_1 instanceof Error ? error_1.message : "Invalid access token");
            case 4: return [2 /*return*/];
        }
    });
}); });
/**
 *
 * @param {AvailableUserRoles} roles
 * @description  This middleware is responsible for validating multiple user roles at a time
 */
var verifyPermission = function (roles) {
    if (roles === void 0) { roles = ["admin"]; }
    return (0, async_handler_1.asyncHandler)(function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
        var _a;
        return __generator(this, function (_b) {
            if (!req.user._id) {
                throw new api_error_1.ApiError(401, "Unauthorized request");
            }
            if (roles.includes((_a = req.user) === null || _a === void 0 ? void 0 : _a.role)) {
                next();
            }
            else {
                throw new api_error_1.ApiError(403, "You are not allowed to perform this operation");
            }
            return [2 /*return*/];
        });
    }); });
};
exports.verifyPermission = verifyPermission;
