const z = require("zod");

module.exports = (schema) => async (req, res, next) => {
  const data = await schema.parse(req.body);

  req.data = data;
  next();
};
