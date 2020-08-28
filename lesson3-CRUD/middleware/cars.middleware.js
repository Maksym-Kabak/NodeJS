module.exports = {
    carsValidity: (req, res, next) => {
        try {
            const cars = req.body;
            if (!cars.producer || !cars.model || !cars.year || !cars.price) {
                throw new Error(`Required property:  producer ,model , year, price`)
            }
            next();
        } catch (e) {
            return res.status(400).end(e.message)
        }
    },

}
