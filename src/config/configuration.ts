export default () => ({
  port: process.env.PORT,
  session: {
    secret: process.env.SESSION_SECRET,
    maxAge: 1000 * 60 * 60 * 24 * 7,
  },
  redis: {
    host: 'redis',
    port: 6379,
  },
  uploadPath: process.env.UPLOAD_PATH,
  nodeEnv: process.env.NODE_ENV,
  admin: {
    email: process.env.ADMIN_EMAIL,
    password: process.env.ADMIN_PASSWORD,
  },
});
