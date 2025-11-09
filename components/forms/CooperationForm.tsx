'use client';

import React, { useState } from 'react';

import { IMaskInput } from 'react-imask';
import { cn } from '@/styles';
import toast from 'react-hot-toast';
import { CheckCircle2, XCircle, X } from 'lucide-react';

const CooperationForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    message: '',
  });
  const [isAgreed, setIsAgreed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<{ name?: string; phone?: string; message?: string }>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const validate = () => {
    const newErrors: { name?: string; phone?: string; message?: string } = {};
    const { name, phone, message } = formData;

    const trimmedName = name.trim();
    if (trimmedName.length < 2) {
      newErrors.name = 'Имя должно содержать минимум 2 символа.';
    } else if (/\d/.test(trimmedName)) {
      newErrors.name = 'Имя не должно содержать цифр.';
    }

    const phoneDigits = phone.replace(/\D/g, '');
    const operatorCodePattern = /^(996)(220|50[0-9]|55[0-9]|70[0-9]|755|99[0-9])/;
    if (phoneDigits.length !== 12) {
      newErrors.phone = 'Номер телефона должен быть заполнен полностью.';
    } else if (!operatorCodePattern.test(phoneDigits)) {
      newErrors.phone = 'Неверный код оператора.';
    }

    if (message.trim().length === 0) {
      newErrors.message = 'Поле "Сообщение" обязательно для заполнения.';
    } else if (message.length > 500) {
      newErrors.message = 'Сообщение не должно превышать 500 символов.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      console.log('Form submitted:', {
        name: formData.name.trim(),
        phone: formData.phone,
        message: formData.message.trim(),
      });
      toast.custom(
        (t) => (
          <div
            className={`${
              t.visible ? 'toast-enter' : 'toast-leave'
            } max-w-sm w-full bg-white shadow-lg rounded-lg pointer-events-auto flex border border-gray-200`}
          >
            <div className="flex-shrink-0 bg-green-500 p-4 flex items-center justify-center rounded-l-lg">
              <CheckCircle2 className="h-7 w-7 text-white" />
            </div>
            <div className="flex-1 w-0 p-4">
              <div className="flex flex-col">
                <p className="text-base font-bold text-gray-900">Заявка принята!</p>
                <p className="mt-1 text-sm text-gray-600">Мы свяжемся с вами в ближайшее время.</p>
              </div>
            </div>
            <div className="p-2">
              <button
                onClick={() => toast.dismiss(t.id)}
                className="p-1 rounded-full hover:bg-gray-100 transition-colors focus:outline-none"
              >
                <X className="h-5 w-5 text-gray-500" />
              </button>
            </div>
          </div>
        ),
        {
          duration: 4000,
        }
      );
      setFormData({ name: '', phone: '', message: '' });
      setIsAgreed(false);
      setErrors({});
    } catch (error) {
      console.error('Form submission error:', error);
      toast.custom(
        (t) => (
          <div
            className={`${
              t.visible ? 'toast-enter' : 'toast-leave'
            } max-w-sm w-full bg-white shadow-lg rounded-lg pointer-events-auto flex border border-gray-200`}
          >
            <div className="flex-shrink-0 bg-red-500 p-4 flex items-center justify-center rounded-l-lg">
              <XCircle className="h-7 w-7 text-white" />
            </div>
            <div className="flex-1 w-0 p-4">
              <div className="flex flex-col">
                <p className="text-base font-bold text-gray-900">Произошла ошибка</p>
                <p className="mt-1 text-sm text-gray-600">Не удалось отправить заявку.</p>
              </div>
            </div>
            <div className="p-2">
              <button
                onClick={() => toast.dismiss(t.id)}
                className="p-1 rounded-full hover:bg-gray-100 transition-colors focus:outline-none"
              >
                <X className="h-5 w-5 text-gray-500" />
              </button>
            </div>
          </div>
        ),
        {
          duration: 5000,
        }
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="rounded-2xl md:rounded-3xl lg:rounded-4xl xl:rounded-[40px] bg-gray-200 w-full lg:h-150 mb-10 container">
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div className="hidden lg:block">
          <img
            src="https://i.pinimg.com/originals/3a/b8/de/3ab8de5e509ba76ffab062236d2c5c31.jpg"  
            className="h-150 rounded-l-[40px]"
            alt="Bathroom interior"
          />
        </div>

        <div className="py-6 px-6 md:py-8 md:px-10 lg:py-8 lg:px-14">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Давайте начнем сотрудничество</h2>
            <p className="mt-2 text-sm text-gray-500">
              Пожалуйста, заполните, чтобы с вами могли связаться
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Поле "Имя" */}
            <div>
              <label htmlFor="coop-name" className="block text-sm font-medium text-gray-700 mb-1">
                Имя
              </label>
              <input
                id="coop-name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                placeholder="Введите ваше имя"
                className={cn(
                  'w-full px-4 py-3 bg-white rounded-lg focus:ring-green-500 focus:border-green-500 transition',
                  errors.name && 'border-red-500'
                )}
              />
              {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
            </div>

            {/* Поле "Номер телефона" */}
            <div>
              <label htmlFor="coop-phone" className="block text-sm font-medium text-gray-700 mb-1">
                Номер телефона
              </label>
              <IMaskInput
                mask="+996 (000) 000-000"
                id="coop-phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onAccept={(value) => setFormData((prev) => ({ ...prev, phone: value as string }))}
                placeholder="+996 (XXX) XXX-XXX"
                className={cn(
                  'w-full px-4 py-3 bg-white rounded-lg focus:ring-green-500 focus:border-green-500 transition',
                  errors.phone && 'border-red-500'
                )}
              />
              {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
            </div>

            {/* Поле "Сообщение" */}
            <div>
              <label
                htmlFor="coop-message"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Сообщение
              </label>
              <textarea
                id="coop-message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={4}
                maxLength={500}
                placeholder="Оставьте сообщение"
                className={cn(
                  'w-full px-4 py-3 bg-white rounded-lg focus:ring-green-500 focus:border-green-500 transition resize-none',
                  errors.message && 'border-red-500'
                )}
              />
              {errors.message && <p className="mt-1 text-sm text-red-600">{errors.message}</p>}
            </div>

            {/* Чекбокс */}
            <div className="flex items-center gap-3">
              <input
                id="agreement"
                type="checkbox"
                checked={isAgreed}
                onChange={(e) => setIsAgreed(e.target.checked)}
                className="h-4 w-4"
              />
              <label htmlFor="agreement" className="text-sm text-gray-600">
                Я согласен с{' '}
                <a
                  href="/privacy-policy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline"
                >
                  Условиями конфиденциальности
                </a>
              </label>
            </div>

            {/* Кнопка "Отправить" */}
            <button
              type="submit"
              disabled={!isAgreed || isSubmitting}
              className="w-full py-3 px-4 bg-green-600 text-white rounded-full text-center font-semibold hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
            >
              {isSubmitting ? 'Отправка...' : 'Отправить'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CooperationForm;
