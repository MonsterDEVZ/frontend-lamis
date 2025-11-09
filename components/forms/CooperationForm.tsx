'use client';
import React, { useCallback, useState } from 'react';
import { IMaskInput } from 'react-imask';
import toast from 'react-hot-toast';
import { CheckCircle2, XCircle, X } from 'lucide-react';
import { cn } from '@/styles';

// Типы для формы и ошибок
interface FormData {
  name: string;
  phone: string;
  message: string;
}

interface FormErrors {
  name?: string;
  phone?: string;
  message?: string;
}

const CooperationForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({ name: '', phone: '', message: '' });
  const [isAgreed, setIsAgreed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});

  // prettier-ignore
  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  }, [errors]);

  const validate = useCallback((): boolean => {
    const newErrors: FormErrors = {};
    const { name, phone, message } = formData;

    const trimmedName = name.trim();
    if (trimmedName.length < 2) newErrors.name = 'Имя должно содержать минимум 2 символа.';
    else if (/\d/.test(trimmedName)) newErrors.name = 'Имя не должно содержать цифр.';

    const phoneDigits = phone.replace(/\D/g, '');
    const operatorCodePattern = /^(996)(220|50[0-9]|55[0-9]|70[0-9]|755|99[0-9])/;
    if (phoneDigits.length !== 12)
      newErrors.phone = 'Номер телефона должен быть заполнен полностью.';
    else if (!operatorCodePattern.test(phoneDigits)) newErrors.phone = 'Неверный код оператора.';

    const trimmedMessage = message.trim();
    if (!trimmedMessage) newErrors.message = 'Поле "Сообщение" обязательно для заполнения.';
    else if (trimmedMessage.length > 500)
      newErrors.message = 'Сообщение не должно превышать 500 символов.';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData]);

  // prettier-ignore
  const showToast = useCallback((type: 'success' | 'error') => {
    const isSuccess = type === 'success';
    const bgColor = isSuccess ? 'bg-green-500' : 'bg-red-500';
    const Icon = isSuccess ? CheckCircle2 : XCircle;
    const title = isSuccess ? 'Заявка принята!' : 'Произошла ошибка';
    const text = isSuccess ? 'Мы свяжемся с вами в ближайшее время.' : 'Не удалось отправить заявку.';

    toast.custom((t) => (
      <div className={cn('max-w-sm w-full bg-white shadow-lg rounded-lg pointer-events-auto flex border border-gray-200 transition-all duration-300', t.visible ? 'toast-enter' : 'toast-leave')}>
        <div className={cn('shrink-0 p-4 flex items-center justify-center rounded-l-lg', bgColor)}>
          <Icon className="h-7 w-7 text-white" />
        </div>
        <div className="flex-1 w-0 p-4">
          <p className="text-base font-bold text-gray-900">{title}</p>
          <p className="mt-1 text-sm text-gray-600">{text}</p>
        </div>
        <div className="p-2">
          <button onClick={() => toast.dismiss(t.id)} className="p-1 rounded-full hover:bg-gray-100 transition-colors focus:outline-none">
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>
      </div>
    ), { duration: isSuccess ? 4000 : 5000 });
  }, []);

  // prettier-ignore
  const handleSubmit = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));

      showToast('success');
      setFormData({ name: '', phone: '', message: '' });
      setIsAgreed(false);
      setErrors({});
    } catch (error) {
      showToast('error');
    } finally {
      setIsSubmitting(false);
    }
  }, [formData, showToast, validate]);

  return (
<<<<<<< HEAD
    <section className="wrapper_centering pb-24">
      <div className="rounded-2xl md:rounded-3xl lg:rounded-4xl xl:rounded-[40px] bg-gray-200 w-full lg:h-150">
        <div className="grid grid-cols-1 lg:grid-cols-2 h-full">
          <div className="hidden lg:block">
            <img
              src="https://i.pinimg.com/originals/3a/b8/de/3ab8de5e509ba76ffab062236d2c5c31.jpg"
              className="h-150 w-full object-cover rounded-l-[40px]"
              alt="Bathroom interior"
            />
=======
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
>>>>>>> 602a169b45dbc620399d7bdc7e5dc4a7c9335b86
          </div>

          <div className="py-6 px-6 md:py-8 md:px-10 lg:py-8 lg:px-14">
            <header className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Давайте начнем сотрудничество</h2>
              <p className="mt-2 text-sm text-gray-500">
                Пожалуйста, заполните, чтобы с вами могли связаться
              </p>
            </header>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Имя */}
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
                    'w-full px-4 py-3 bg-white rounded-lg focus:ring-green-500 focus:border-green-500 transition border',
                    errors.name ? 'border-red-500' : 'border-transparent'
                  )}
                />
                {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
              </div>

              {/* Телефон */}
              <div>
                <label
                  htmlFor="coop-phone"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
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
                    'w-full px-4 py-3 bg-white rounded-lg focus:ring-green-500 focus:border-green-500 transition border',
                    errors.phone ? 'border-red-500' : 'border-transparent'
                  )}
                />
                {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
              </div>

              {/* Сообщение */}
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
                    'w-full px-4 py-3 bg-white rounded-lg focus:ring-green-500 focus:border-green-500 transition resize-none border',
                    errors.message ? 'border-red-500' : 'border-transparent'
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
                  className="h-4 w-4 accent-green-600"
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

              {/* Кнопка */}
              <button
                type="submit"
                disabled={!isAgreed || isSubmitting}
                className="w-full py-3 px-4 bg-green-600 text-white rounded-full font-semibold hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
              >
                {isSubmitting ? 'Отправка...' : 'Отправить'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CooperationForm;
