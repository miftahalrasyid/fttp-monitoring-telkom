module.exports = {
  /** to generate standalone node server */
  output: 'standalone',
  // experimental: {
  //   outputStandalone: true,
    // outputFileTracingRoot: path.join(__dirname, '../../')
  // },
  reactStrictMode: true,
  images: {
    domains: [
      'paperlessodctelkom.xyz',
      'www.paperlessodctelkom.xyz',
      'localhost',
      'localhost:3000'
    ],
  },
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
        source: '/uploads/:filename',
        destination: process.env.NEXT_PUBLIC_API_HOST+'/uploads/:filename',
      },
      // {
      //   source: '/api/:path/:odc_id',
      //   destination: process.env.NEXT_PUBLIC_API_HOST+'/api/:path/:odc_id',
      // },
      {
        source: '/login',
        destination: process.env.NEXT_PUBLIC_API_HOST+'/login',
      },
      {
        source: '/verify-otp',
        destination: process.env.NEXT_PUBLIC_API_HOST+'/verify-otp',
      },
      {
        source: '/forgot-password',
        destination: process.env.NEXT_PUBLIC_API_HOST+'/forgot-password',
      },
      {
        source: '/verify-forgot-password',
        destination: process.env.NEXT_PUBLIC_API_HOST+'/verify-forgot-password',
      },
      {
        source: '/update-password',
        destination: process.env.NEXT_PUBLIC_API_HOST+'/update-password',
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