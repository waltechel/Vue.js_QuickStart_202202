module.exports = {
    devServer: {
        proxy: {
            '/api': {
                target: "http://sample.bmaster.kro.kr",
                // target: 'http://localhost:3000',
                ws: true,
                changeOrigin: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    }
}