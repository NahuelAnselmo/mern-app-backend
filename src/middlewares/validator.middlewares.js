export const validateSchema = (schemas) => (req, res, next) => {
  try {
    if (schemas.body) {
      const result = schemas.body.safeParse(req.body);
      if (!result.success) {
        return res.status(400).json({
          errors: result.error.errors.map(
            (e) => `${e.path.join('.')} - ${e.message}`,
          ),
        });
      }
      req.body = result.data;
    }

    if (schemas.params) {
      const result = schemas.params.safeParse(req.params);
      if (!result.success) {
        return res.status(400).json({
          errors: result.error.errors.map(
            (e) => `${e.path.join('.')} - ${e.message}`,
          ),
        });
      }
      req.params = result.data;
    }

    if (schemas.query) {
      const result = schemas.query.safeParse(req.query);
      if (!result.success) {
        return res.status(400).json({
          errors: result.error.errors.map(
            (e) => `${e.path.join('.')} - ${e.message}`,
          ),
        });
      }
      req.query = result.data;
    }

    next();
  } catch (err) {
    return res.status(500).json({ errors: ['Validation middleware error'] });
  }
};
