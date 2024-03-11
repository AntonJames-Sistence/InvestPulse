module.exports = {
    async redirects() {
        return [
        // Basic redirect
        {
            source: '/:slug',
            destination: '/?slug=:slug',
            permanent: true,
        },
        ]
    },
}