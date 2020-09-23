module.exports = {
    DB_NAME: process.env.DB_NAME || 'carsshop',
    DB_USER: process.env.DB_USER || 'root',
    DB_PASSWORD: process.env.DB_PASS || '119256',

    ROOT_EMAIL: process.env.ROOT_EMAIL || 'admin@crs.com',
    ROOT_EMAIL_PASS: process.env.ROOT_EMAIL_PASS || '12345',
    FRONTEND_URL: process.env.FORNTEND_URL || 'https://owu.com.ua/',

    ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET || 'dasdsdasd',
    REFRESH_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET || 'usqweqeqwewqer',
}
