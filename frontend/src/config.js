export default (process.env.NODE_ENV === 'development'
  ? {
      server: 'https://localhost:4160',
    }
  : {
      server: 'https://wapp.weblite.me/stacklite',
    })
