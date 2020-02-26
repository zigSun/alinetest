const joi = require('joi')

function validateObject (object = {}, label, schema, options) {
  if (schema) {
    const { error, value } = joi.validate(object, schema, options)
    if (error) {
      throw new Error(`Invalid ${label} - ${error.message}`)
    } else {
      return value;
    }
  }
}

function validate (validationObj) {
  return (ctx, next) => {
    try {
      ctx.HEADERS = validateObject(ctx.headers, 'Headers', validationObj.headers, { allowUnknown: true })
      ctx.PARAMS = validateObject(ctx.params, 'URL Parameters', validationObj.params)
      ctx.QUERY = validateObject(ctx.request.query, 'query', validationObj.query)

      if (ctx.request.body) {
        ctx.BODY = validateObject(ctx.request.body, 'Request Body', validationObj.body)
      }

      return next()
    } catch (err) {

      ctx.throw(400, err.message)
    }
  }
}

module.exports = validate