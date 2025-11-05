'use client';

/**
 * Login Page
 * User authentication with email and password
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
import { login, getCurrentUser } from '@/services/authService';
import { useAuthStore } from '@/store/authStore';

// Validation schema
const loginSchema = z.object({
  email: z.string().email('Введите корректный email'),
  password: z.string().min(1, 'Введите пароль'),
});

type LoginForm = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();
  const setAuth = useAuthStore((state) => state.setAuth);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>('');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginForm) => {
    setIsLoading(true);
    setError('');

    try {
      // Login and get tokens
      const tokens = await login(data);

      // Get user data
      const user = await getCurrentUser(tokens.access_token);

      // Update auth store
      setAuth(tokens.access_token, tokens.refresh_token, user);

      // Redirect to home or profile
      router.push('/profile');
    } catch (err: any) {
      setError(err.message || 'Ошибка при входе');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12">
      <div className="w-full max-w-md">
        <Card>
          <CardHeader>
            <CardTitle>Вход в аккаунт</CardTitle>
            <CardDescription>Войдите для доступа к вашему профилю</CardDescription>
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
                placeholder="Введите пароль"
                error={errors.password?.message}
                {...register('password')}
                disabled={isLoading}
              />

              <Button type="submit" variant="primary" isLoading={isLoading} className="w-full">
                {isLoading ? 'Вход...' : 'Войти'}
              </Button>

              <div className="text-center text-sm text-gray-600">
                Нет аккаунта?{' '}
                <Link href="/register" className="text-[#009b3e] hover:underline font-medium">
                  Зарегистрироваться
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
