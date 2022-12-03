const {STATUS_MESSAGE: { SUCCESS, WARNING, ERROR, UNAUTHORIZED, FORBIDDEN }} = require('../constant/core.constants');

const createResponseData = (message, data, count, other = {}) => {
    if (typeof other !== 'object') {
        other = {};
    }
    if (typeof message === 'object' && message.statusCode && message.message) {
        return {
            statusCode: message.statusCode,
            message: message.message,
            data: data || null,
            ...(count && { count }),
            ...other,
        };
    }
    return {
        statusCode: 200,
        message: message,
        data: data || null,
        ...(count && { count }),
        ...other,
    };
};

const responseUtility = {
    sendResponse: (res, responseData) => {
        res.status(responseData.statusCode).json(responseData);
    },
    sendSuccess: (res, successMessage, data, count, other) => {
        successMessage = successMessage || SUCCESS;
        const responseData = createResponseData(
            successMessage,
            data,
            count,
            other
        );
        if (!successMessage.statusCode) {
            successMessage.statusCode = 200;
        }
        responseUtility.sendResponse(res, responseData);
    },
    sendWarning: (res, warningMessage, data, count, other) => {
        warningMessage = warningMessage || WARNING;
        const responseData = createResponseData(
            warningMessage,
            data,
            count,
            other
        );
        if (!responseData.statusCode) {
            responseData.statusCode = WARNING.statusCode;
        }
        responseUtility.sendResponse(res, responseData);
    },
    sendError: (res, errorMessage, data, count, other) => {
        errorMessage = errorMessage || ERROR;
        const responseData = createResponseData(
            errorMessage,
            data,
            count,
            other
        );
        if (!responseData.statusCode) {
            responseData.statusCode = ERROR.statusCode;
        }
        responseUtility.sendResponse(res, responseData);
    },
    sendUnauthenticated: (res, errorMessage, data) => {
        errorMessage = errorMessage || UNAUTHORIZED;
        const responseData = createResponseData(errorMessage, data);
        if (!responseData.statusCode) {
            responseData.statusCode = UNAUTHORIZED.statusCode;
        }
        responseUtility.sendResponse(res, responseData);
    },
    sendForbidden: (res, errorMessage, data) => {
        errorMessage = errorMessage || FORBIDDEN;
        const responseData = createResponseData(errorMessage, data);
        if (!responseData.statusCode) {
            responseData.statusCode = FORBIDDEN.statusCode;
        }
        responseUtility.sendResponse(res, responseData);
    },
};

module.exports = responseUtility;
