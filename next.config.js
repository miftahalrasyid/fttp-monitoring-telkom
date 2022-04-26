module.exports = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/api/:path',
        destination: process.env.NEXT_PUBLIC_API_HOST+'/api/:path',
      },
      {
        source: '/login',
        destination: process.env.NEXT_PUBLIC_API_HOST+'/login',
      },
      {
        source: '/verify-otp',
        destination: process.env.NEXT_PUBLIC_API_HOST+'/verify-otp',
      },
    ]
  },
}