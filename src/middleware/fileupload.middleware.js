const path = require('path');
const { error } = require('../config/error.names');

exports.fileuploadMiddleware = function (uploadFolder, allowedFileTypes, allowedFileSize, reqFileKeyName, required = true) {
    return async (req, res, next) => {
        try {
            if (!required && req.files) {
                if (!uploadFolder) {
                    return res.status(601).json({
                        status: 601,
                        error: error.UPLOAD_ERROR_DISC,
                        message: `Fayl yuklashda hatolik: ${uploadFolder} diskda bunday popka mavjud emas!`,
                    });
                }

                if (reqFileKeyName != Object.keys(req.files)[0]) {
                    return res.status(601).json({
                        status: 601,
                        error: error.UPLOAD_ERROR_NAME,
                        message: `Iltimos faylni ${reqFileKeyName} nomi orqali jo'nating`,
                    });
                }

                const findAllowedFileType = allowedFileTypes.find(el => el == req.files[reqFileKeyName].mimetype);
                if (!findAllowedFileType) {
                    return res.status(601).json({
                        status: 601,
                        error: error.UPLOAD_ERROR_TYPE,
                        message: `Iltimos faylni type ${allowedFileTypes.join(' yoki ')} bo'lsin`,
                    });
                }

                const requiredFileSize = Math.round(allowedFileSize / 1024 / 1024);
                if (requiredFileSize < Math.round(req.files[reqFileKeyName].size / 1024 / 1024)) {
                    return res.status(601).json({
                        status: 601,
                        error: error.UPLOAD_ERROR_MEMORY,
                        message: `Iltimos faylni razmeri ${requiredFileSize} MB dan kichik bo'lsin`,
                    });
                }
                next();
            } else if (required) {
                if (required && !req.files) {
                    return res.status(601).json({
                        status: 601,
                        error: error.UPLOAD_ERROR_REQUIRED,
                        message: `Fayl yuklashda hatolik: fayl kiritish majburiy`,
                    });
                }

                if (!uploadFolder) {
                    return res.status(601).json({
                        status: 601,
                        error: error.UPLOAD_ERROR_DISC,
                        message: `Fayl yuklashda hatolik: ${uploadFolder} diskda bunday popka mavjud emas!`,
                    });
                }

                if (reqFileKeyName != Object.keys(req.files)[0]) {
                    return res.status(601).json({
                        status: 601,
                        error: error.UPLOAD_ERROR_NAME,
                        message: `Iltimos faylni ${reqFileKeyName} nomi orqali jo'nating`,
                    });
                }

                const findAllowedFileType = allowedFileTypes.find(el => el == req.files[reqFileKeyName].mimetype);
                if (!findAllowedFileType) {
                    return res.status(601).json({
                        status: 601,
                        error: error.UPLOAD_ERROR_TYPE,
                        message: `Iltimos faylni type ${allowedFileTypes.join(' yoki ')} bo'lsin`,
                    });
                }

                const requiredFileSize = Math.round(allowedFileSize / 1024 / 1024);
                if (requiredFileSize < Math.round(req.files[reqFileKeyName].size / 1024 / 1024)) {
                    return res.status(601).json({
                        status: 601,
                        error: error.UPLOAD_ERROR_MEMORY,
                        message: `Iltimos faylni razmeri ${requiredFileSize} MB dan kichik bo'lsin`,
                    });
                }

                next();
            } else {
                next();
            }
        } catch (error) {
            next(error);
        }
    };
};
