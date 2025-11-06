'use client';

import React, { useState } from 'react';

interface FeedbackFormProps {
  onSubmit: (data: { name: string; phone: string; }) => void;
  isSubmitting: boolean;
  onCancel: () => void;
}

const FeedbackForm: React.FC<FeedbackFormProps> = ({ onSubmit, isSubmitting, onCancel }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) {
      return;
    }
    onSubmit({ name, phone });
  };

  return (
    <form onSubmit={handleFormSubmit} className="flex flex-col gap-6">
      

      <div className="text-left">
        <h2 className="text-2xl font-semibold text-gray-800">
          Оставьте заявку
        </h2>
        <p className="mt-2 text-sm text-gray-500">
          Оставьте ваши данные, и наш менеджер свяжется с вами в ближайшее время.
        </p>
      </div>


      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
          Ваше имя <span className="text-red-500">*</span>
        </label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Введите ваше имя"
          required
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500 transition"
        />
      </div>

      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
          Номер телефона <span className="text-red-500">*</span>
        </label>
        <input
          id="phone"
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="+996 XXX XXX XXX"
          required
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500 transition"
        />
      </div>


      <div className="flex items-center gap-4 mt-4">
        <button
          type="button"
          onClick={onCancel}
          className="w-full py-3 px-4 border border-gray-300 rounded-full text-center font-semibold text-gray-800 hover:bg-gray-50 transition"
        >
          Отмена
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-3 px-4 bg-green-600 text-white rounded-full text-center font-semibold hover:bg-green-700 disabled:bg-gray-400 transition"
        >
          {isSubmitting ? 'Отправка...' : 'Отправить заказ'}
        </button>
      </div>
    </form>
  );
};

export default FeedbackForm;