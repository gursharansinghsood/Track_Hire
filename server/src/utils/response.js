export const requiredFieldsError = (res, message = "All fields are required") => {
    return res.status(400).json({
        success: false,
        message
    });
};

export const conflictResponse = (res, message = "Conflict") => {
    return res.status(409).json({
        success: false,
        message
    });
};

export const invalidResponse = (res, message = "Invalid Credentials") => {
    return res.status(401).json({
        success: false,
        message
    });
};

export const successResponse = (res, message, data = null) => {
    return res.status(200).json({
        success: true,
        message,
        data
    });
};

export const errorResponse = (res, error = "Internal Server Error") => {
    return res.status(500).json({
        success: false,
        message: error
    });
};

export const unauthorizedResponse = (res, message = "Unauthorized",) => {
    return res.status(401).json({
        success: false,
        message,
    });
};