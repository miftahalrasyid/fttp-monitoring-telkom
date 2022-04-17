module.exports = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/api/:path',
        destination: process.env.NEXT_PUBLIC_API_HOST+'/api/:path',
      },
      {
        source: '/api/:path/:user_id',
        destination: process.env.NEXT_PUBLIC_API_HOST+'/api/:path/:user_id',
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