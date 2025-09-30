export const validateSchema = (schemas) => (req, res, next) => {
  try {
    if (schemas.body) {
      const result = schemas.body.safeParse(req.body);
      if (!result.success) {
        return res.status(400).json({
          errors: result.error.errors.map((e) => ({
            path: e.path.join('.'),
            message: e.message,
          })),
        });
      }
      Object.assign(req.body, result.data); // ✅ Corrección aquí
    }

    if (schemas.params) {
      const result = schemas.params.safeParse(req.params);
      if (!result.success) {
        return res.status(400).json({
          errors: result.error.errors.map((e) => ({
            path: e.path.join('.'),
            message: e.message,
          })),
        });
      }
      Object.assign(req.params, result.data); // ✅ Corrección aquí
    }

    if (schemas.query) {
      const result = schemas.query.safeParse(req.query);
      if (!result.success) {
        return res.status(400).json({
          errors: result.error.errors.map((e) => ({
            path: e.path.join('.'),
            message: e.message,
          })),
        });
      }
      Object.assign(req.query, result.data); // ✅ Corrección aquí
    }

    next();
  } catch (err) {
    console.error(err); // Para debug
    return res.status(500).json({
      errors: [{ message: 'Unexpected validation middleware error' }],
    });
  }
};
