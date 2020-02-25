require("dotenv").config();
const koa = require("koa");
const bodyParser = require("koa-body");
const router = require('./router');

const app = new koa();

app.use(bodyParser());

app.use(async (ctx, next) => {
  if (process.env.DEBUG === "true") {
    console.log(ctx.request.body);
  }
  try {
    await next();
  } catch (err) {
    ctx.status = err.statusCode || err.status || 500;
    ctx.body = {
      error: err.message
    };
  }
});

app.use(router.routes());

const server = app.listen(process.env.APP_PORT || 3000, () =>
  console.log(`Сервер запущен на ${process.env.APP_PORT || 3000} порту`)
);

module.exports = server;
