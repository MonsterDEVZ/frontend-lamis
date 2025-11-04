'use client';

/**
 * Register Page
 * User registration with email and password
 */

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import { register as registerUser, login, getCurrentUser } from '@/services/authService';
import { useAuthStore } from '@/store/authStore';

// Validation schema
const registerSchema = z.object({
  email: z.string().email('Введите корректный email'),
  password: z
    .string()
    .min(8, 'Пароль должен содержать минимум 8 символов')
    .regex(/[A-Z]/, 'Пароль должен содержать хотя бы одну заглавную букву')
    .regex(/[0-9]/, 'Пароль должен содержать хотя бы одну цифру'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Пароли не совпадают',
  path: ['confirmPassword'],
});

type RegisterForm = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const router = useRouter();
  const setAuth = useAuthStore((state) => state.setAuth);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>('');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterForm) => {
    setIsLoading(true);
    setError('');

    try {
      // Register the user
      await registerUser({
        email: data.email,
        password: data.password,
      });

      // Automatically login after registration
      const tokens = await login({
        email: data.email,
        password: data.password,
      });

      // Get user data
      const user = await getCurrentUser(tokens.access_token);

      // Update auth store
      setAuth(tokens.access_token, tokens.refresh_token, user);

      // Redirect to home or profile
      router.push('/');
    } catch (err: any) {
      setError(err.message || 'Ошибка при регистрации');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12">
      <div className="w-full max-w-md">
        <Card>
          <CardHeader>
            <CardTitle>Создать аккаунт</CardTitle>
            <CardDescription>
              Зарегистрируйтесь для доступа к LAMIS
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm">
                  {error}
                </div>
              )}

              <Input
                label="Email"
                type="email"
                placeholder="example@email.com"
                error={errors.email?.message}
                {...register('email')}
                disabled={isLoading}
              />

              <Input
                label="Пароль"
                type="password"
                placeholder="Минимум 8 символов"
                error={errors.password?.message}
                {...register('password')}
                disabled={isLoading}
              />

              <Input
                label="Подтвердите пароль"
                type="password"
                placeholder="Повторите пароль"
                error={errors.confirmPassword?.message}
                {...register('confirmPassword')}
                disabled={isLoading}
              />

              <Button
                type="submit"
                variant="primary"
                isLoading={isLoading}
                className="w-full"
              >
                {isLoading ? 'Регистрация...' : 'Зарегистрироваться'}
              </Button>

              <div className="text-center text-sm text-gray-600">
                Уже есть аккаунт?{' '}
                <Link href="/login" className="text-[#009b3e] hover:underline font-medium">
                  Войти
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
