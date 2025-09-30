import { z } from 'zod';

// Schema para crear una tarea (POST /tasks)
export const createTaskSchema = z.object({
  title: z.string({
    required_error: 'Title is required',
    invalid_type_error: 'Title must be a string',
  })
    .min(3, { message: 'Title must be at least 3 characters' })
    .max(100, { message: 'Title must be at most 100 characters' })
    .trim(),
  description: z.string({
    invalid_type_error: 'Description must be a string',
  })
    .max(500, { message: 'Description must be at most 500 characters' })
    .trim()
    .optional(),
  date: z.string({
    invalid_type_error: 'Date must be a string',
  })
    .refine(
      (val) => !val || /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d{3})?Z$/.test(val),
      { message: 'Date must be in ISO 8601 format (YYYY-MM-DDTHH:mm:ss.sssZ)' }
    )
    .optional(),
});

// Actualizar tarea (PUT /tasks/:id)
export const updateTaskSchema = z.object({
  title: z.string()
    .min(3, { message: 'Title must be at least 3 characters' })
    .max(100, { message: 'Title must be at most 100 characters' })
    .trim()
    .optional(),
  description: z.string()
    .max(500, { message: 'Description must be at most 500 characters' })
    .trim()
    .optional(),
  date: z.string()
    .refine(
      (val) => !val || /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d{3})?Z$/.test(val),
      { message: 'Date must be in ISO 8601 format (YYYY-MM-DDTHH:mm:ss.sssZ)' }
    )
    .optional(),
});

// Validar parámetro :id (GET, PUT, DELETE /tasks/:id)
export const taskIdParamSchema = z.object({
  id: z.string().regex(/^[0-9a-fA-F]{24}$/, { message: 'Invalid task ID format' }),
});

// Validar query params en GET /tasks (paginación/filtros)
export const getTasksQuerySchema = z.object({
  page: z.string().regex(/^\d+$/, { message: 'Page must be a number' }).optional(),
  limit: z.string().regex(/^\d+$/, { message: 'Limit must be a number' }).optional(),
});
