app.use(
    '/api',
    createProxyMiddleware({
    //   target: 'http://localhost:4000',
      target: process.env.REACT_APP_TARGET,
      changeOrigin: true,
    })
  );