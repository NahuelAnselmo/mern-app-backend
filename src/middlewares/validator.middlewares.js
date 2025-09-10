// middlewares/validator.middlewares.js
export const validateSchema = (schemas) => (req, res, next) => {
  try {
    // validamos body si existe schema
    if (schemas.body) {
      const result = schemas.body.safeParse(req.body);
      if (!result.success) {
        return res.status(400).json({
          errors: result.error.errors.map((e) => ({
            path: `body.${e.path.join(".")}`,
            message: e.message,
          })),
        });
      }
      req.body = result.data; // body validado y limpio
    }

    // validamos params si existe schema
    if (schemas.params) {
      const result = schemas.params.safeParse(req.params);
      if (!result.success) {
        return res.status(400).json({
          errors: result.error.errors.map((e) => ({
            path: `params.${e.path.join(".")}`,
            message: e.message,
          })),
        });
      }
      req.params = result.data;
    }

    // validamos query si existe schema
    if (schemas.query) {
      const result = schemas.query.safeParse(req.query);
      if (!result.success) {
        return res.status(400).json({
          errors: result.error.errors.map((e) => ({
            path: `query.${e.path.join(".")}`,
            message: e.message,
          })),
        });
      }
      req.query = result.data;
    }

    next();
  } catch (err) {
    return res.status(500).json({ message: "Validation middleware error", error: err });
  }
};
