export default (schema) => async (req, res, next) => {
  const data = await schema.parse(req.body);

  req.body = data;
  next();
};
