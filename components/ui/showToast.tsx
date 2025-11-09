import { CheckCircle2, XCircle, X } from 'lucide-react';
import toast from 'react-hot-toast';
import { cn } from '@/styles';

type ToastType = 'success' | 'error';

interface ToastOptions {
  title?: string;
  text?: string;
  duration?: number;
}

/** Универсальный кастомный toast для всего проекта */
export const showToast = (type: ToastType, options: ToastOptions = {}) => {
  const isSuccess = type === 'success';
  const bgColor = isSuccess ? 'bg-green-500' : 'bg-red-500';
  const Icon = isSuccess ? CheckCircle2 : XCircle;

  const title = options.title ?? (isSuccess ? 'Заявка принята!' : 'Произошла ошибка');
  const text =
    options.text ??
    (isSuccess ? 'Мы свяжемся с вами в ближайшее время.' : 'Не удалось отправить заявку.');

  toast.custom(
    (t) => (
      <div
        className={cn(
          'max-w-sm w-full bg-white shadow-lg rounded-lg pointer-events-auto flex border border-gray-200 transition-all duration-300',
          t.visible ? 'toast-enter' : 'toast-leave'
        )}
      >
        <div className={cn('shrink-0 p-4 flex items-center justify-center rounded-l-lg', bgColor)}>
          <Icon className="h-7 w-7 text-white" />
        </div>
        <div className="flex-1 w-0 p-4">
          <p className="text-base font-bold text-gray-900">{title}</p>
          <p className="mt-1 text-sm text-gray-600">{text}</p>
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
      duration: options.duration ?? (isSuccess ? 4000 : 5000),
    }
  );
};
