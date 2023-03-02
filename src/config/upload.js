const path = require('path');
const fs = require('fs');

const PROFILE_IMAGE_SIZE = 15 * 1024 * 1024; // 15MB
const PROFILE_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png'];
const UPLOAD_FOLDER = path.join(process.cwd(), 'uploads');

if (!fs.existsSync(UPLOAD_FOLDER)) {
    fs.mkdirSync(UPLOAD_FOLDER);
}

module.exports = {
    PROFILE_IMAGE_SIZE,
    PROFILE_IMAGE_TYPES,
    UPLOAD_FOLDER,
};
