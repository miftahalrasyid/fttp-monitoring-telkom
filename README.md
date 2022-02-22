This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## Thanks to 
https://github.com/kirill-konshin/next-redux-wrapper/issues/270
https://github.com/kirill-konshin/next-redux-wrapper#getstaticprops

## About this project

it is build in next js framework.
the idea of this webapps is to reorganize and digitize networking cable tray. this are include splitting, naming, and checking the network cable.

### Security

i use restful API arhitectural model for building this site so it can communicate with further frontend tech that will implements afterwards.

#### CSRF 
in this project, i use jwt token to prevent csrf attack. the token are implemented on Bearer token inside every POST request. so, i hope that no unauthorize action will pass the token screening process.

### Page Render Method / Data Fetching Scheme

unlike react js, next js are server side rendering. so the page already been rendered in the server then push it into the client view.