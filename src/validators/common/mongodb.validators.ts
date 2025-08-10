import { body, param } from "express-validator";

/**
 *
 * @param {string} idName
 * @description validators to validated mongodb id passed in params
 */

export const mongodIdPathVariableValidator = (idName: string) => {
  return [
    param(idName).notEmpty().isMongoId().withMessage(`Invalid ${idName}`),
  ];
};

/**
 * @param {string} idName
 * @description a common validator to validate mongodb id passed in body
 */

export const mongoIdRequestBodyValidator = (idName: string) => {
  return [body(idName).notEmpty().isMongoId().withMessage(`Invalid ${idName}`)];
};
