import { z } from 'zod';

export const registerSchema = z
  .object({
    nickname: z
      .string()
      .min(2, 'Nickname must contain at least 2 characters')
      .max(20, 'Too long nickname'),

    email: z
      .string()
      .email('Incorrect email'),

    password: z
      .string()
      .min(5, 'Password nust contain at least 5 characters')
      .max(32, 'Password too long'),

    passwordConfirmation: z
      .string(),
  })
  .refine(
    (data) => data.password === data.passwordConfirmation,
    {
      message: 'Passwords don\'t match',
      path: ['passwordConfirmation'],
    },
  );
