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
  webpack: (config, options) => {
    config.module.rules.push(
    { 
      test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, 
      use:[
        {loader: "url-loader?limit=10000&minetype=application/font-woff"}
      ] 
    },
    { 
      test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, 
      use:[
        {loader: "file-loader"}
      ] 
    })

    return config
  },
}