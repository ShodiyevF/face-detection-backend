const path = require('path')
const { error } = require("../config/error.names")

exports.fileuploadMiddleware = function(uploadFolder, allowedFileTypes, allowedFileSize, reqFileKeyName, required = true){
    return async (req, res, next) => {
        try {
            
            if (!required && req.files) {
                if(!uploadFolder){
                    return res.json({
                        status: 400,
                        error: error.UPLOAD_ERROR,
                        message: `Fayl yuklashda hatolik: ${uploadFolder} diskda bunday popka mavjud emas!`
                    })
                }
                
                if (reqFileKeyName != Object.keys(req.files)[0]) {
                    return res.json({
                        status: 400,
                        error: error.UPLOAD_ERROR,
                        message: `Iltimos faylni ${reqFileKeyName} nomi orqali jo'nating`
                    })
                }
                
                const findAllowedFileType = allowedFileTypes.find(el => el == req.files[reqFileKeyName].mimetype)
                if(!findAllowedFileType){
                    return res.json({
                        status: 400,
                        error: error.UPLOAD_ERROR,
                        message: `Iltimos faylni type ${allowedFileTypes.join(' yoki ')} bo'lsin`
                    })
                }
                
                const requiredFileSize = Math.round(allowedFileSize / 1024 / 1024)
                if(requiredFileSize < Math.round(req.files[reqFileKeyName].size / 1024 / 1024)){
                    return res.json({
                        status: 400,
                        error: error.UPLOAD_ERROR,
                        message: `Iltimos faylni razmeri ${requiredFileSize} MB dan kichik bo'lsin`
                    })
                }
                const ext = path.extname(req.files[reqFileKeyName].name);
                const filename = `${Date.now()}-${String(Math.round(Math.random() * 1e9)).padEnd(15, '0') + ext}`
                req.files[reqFileKeyName].mv(uploadFolder+'\\'+filename)
                next()
            } else if (required) {
                if (required && !req.files) {
                    return res.json({
                        status: 400,
                        error: error.UPLOAD_ERROR,
                        message: `Fayl yuklashda hatolik: fayl kiritish majburiy`
                    })
                }

                if(!uploadFolder){
                    return res.json({
                        status: 400,
                        error: error.UPLOAD_ERROR,
                        message: `Fayl yuklashda hatolik: ${uploadFolder} diskda bunday popka mavjud emas!`
                    })
                }
                
                if (reqFileKeyName != Object.keys(req.files)[0]) {
                    return res.json({
                        status: 400,
                        error: error.UPLOAD_ERROR,
                        message: `Iltimos faylni ${reqFileKeyName} nomi orqali jo'nating`
                    })
                }
                
                const findAllowedFileType = allowedFileTypes.find(el => el == req.files[reqFileKeyName].mimetype)
                if(!findAllowedFileType){
                    return res.json({
                        status: 400,
                        error: error.UPLOAD_ERROR,
                        message: `Iltimos faylni type ${allowedFileTypes.join(' yoki ')} bo'lsin`
                    })
                }
                
                const requiredFileSize = Math.round(allowedFileSize / 1024 / 1024)
                if(requiredFileSize < Math.round(req.files[reqFileKeyName].size / 1024 / 1024)){
                    return res.json({
                        status: 400,
                        error: error.UPLOAD_ERROR,
                        message: `Iltimos faylni razmeri ${requiredFileSize} MB dan kichik bo'lsin`
                    })
                }

                const ext = path.extname(req.files[reqFileKeyName].name);
                console.log(ext);
                const filename = `${Date.now()}-${String(Math.round(Math.random() * 1e9)).padEnd(15, '0') + ext}`
                req.files[reqFileKeyName].mv(uploadFolder+'\\'+filename)
                next()

            }
            
        } catch (error) {
            next(error)
        }
    }
}