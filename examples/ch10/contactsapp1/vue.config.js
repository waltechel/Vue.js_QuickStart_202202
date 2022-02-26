module.exports = {
    devServer: {
        proxy: {
            // 개발용 서버에 /api/contact로 요청하면 http://localhost:3000/contacts로 요청을 전달합니다.
            // 서버 켜기 싫으면 target을 http://sample.bmaster.kro.kr
            '/api': {
                // target: 'http://localhost:3000',
                target: 'http://sample.bmaster.kro.kr',
                ws: true,
                changeOrigin: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    }
}