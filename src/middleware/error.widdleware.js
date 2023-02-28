const errorMiddleware = (req, res, next) => {
    try {
        res.status(200).json({ status: 200, enum: 'asd', message: 'asd' });
    } catch (error) {
        console.log(error);
    }
};

module.exports = { errorMiddleware };
