'use client';

import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Button } from './Button';
import { cn } from '@/styles';

interface OrderItem {
  id: string | number;
  name: string;
  price: number;
  image: string;
  quantity?: number;
}

interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: OrderItem[];
  onSubmit: (data: { name: string; phone: string; items: OrderItem[] }) => void;
}

const OrderModal: React.FC<OrderModalProps> = ({ isOpen, onClose, items, onSubmit }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<{ name?: string; phone?: string }>({});

  // Эффект для блокировки прокрутки фона
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    // Функция очистки, которая вернет прокрутку, если компонент будет удален
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  const validateForm = () => {
    const newErrors: { name?: string; phone?: string } = {};
    if (!name.trim()) {
      newErrors.name = 'Введите ваше имя';
    }
    if (!phone.trim()) {
      newErrors.phone = 'Введите номер телефона';
    } else if (!/^[\d\s\+\-\(\)]+$/.test(phone)) {
      newErrors.phone = 'Некорректный формат телефона';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    setIsSubmitting(true);
    try {
      await onSubmit({
        name: name.trim(),
        phone: phone.trim(),
        items,
      });
      setName('');
      setPhone('');
      setErrors({});
      onClose();
    } catch (error) {
      console.error('Error submitting order:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const totalPrice = items.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0);

  return (
    <div
      className={`fixed inset-0 z-50 transition-opacity duration-300 ${
        isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
    >
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
      />

      {/* Modal */}
      <div
        className={`flex items-center justify-center p-4 h-full w-full transition-all duration-300 ${
          isOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
        }`}
      >
        <div
          className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900">Оформление заказа</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              aria-label="Закрыть"
            >
              <X size={24} className="text-gray-600" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6">
            {/* Товары */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Выбранные товары ({items.length})
              </h3>
              <div className="space-y-3 max-h-64 overflow-y-auto">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg"
                  >
                    <div className="relative w-16 h-16 flex-shrink-0 bg-white rounded-lg overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-contain p-1"
                      />
                    </div>
                    <div className="flex-grow">
                      <p className="text-sm font-medium text-gray-900 line-clamp-2">
                        {item.name}
                      </p>
                      <p className="text-sm text-gray-600 mt-1">
                        {item.price.toLocaleString('ru-RU')} С
                        {item.quantity && item.quantity > 1 && ` × ${item.quantity}`}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Общая сумма */}
              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="flex items-center justify-between">
                  <span className="text-lg font-semibold text-gray-900">Итого:</span>
                  <span className="text-2xl font-bold text-[#009B3E]">
                    {totalPrice.toLocaleString('ru-RU')} С
                  </span>
                </div>
              </div>
            </div>

            {/* Форма */}
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                {/* Имя */}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Ваше имя <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      if (errors.name) setErrors({ ...errors, name: undefined });
                    }}
                    className={cn(
                      'w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors',
                      errors.name
                        ? 'border-red-500 focus:ring-red-500'
                        : 'border-gray-300 focus:ring-[#009B3E] focus:border-[#009B3E]'
                    )}
                    placeholder="Введите ваше имя"
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-500">{errors.name}</p>
                  )}
                </div>

                {/* Телефон */}
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                    Номер телефона <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    value={phone}
                    onChange={(e) => {
                      setPhone(e.target.value);
                      if (errors.phone) setErrors({ ...errors, phone: undefined });
                    }}
                    className={cn(
                      'w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors',
                      errors.phone
                        ? 'border-red-500 focus:ring-red-500'
                        : 'border-gray-300 focus:ring-[#009B3E] focus:border-[#009B3E]'
                    )}
                    placeholder="+996 XXX XXX XXX"
                  />
                  {errors.phone && (
                    <p className="mt-1 text-sm text-red-500">{errors.phone}</p>
                  )}
                </div>
              </div>

              {/* Buttons */}
              <div className="flex gap-3 mt-6">
                <Button
                  type="button"
                  variant="outline"
                  size="lg"
                  onClick={onClose}
                  className="flex-1"
                >
                  Отмена
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  isLoading={isSubmitting}
                  className="flex-1"
                >
                  {isSubmitting ? 'Отправка...' : 'Отправить заказ'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderModal;