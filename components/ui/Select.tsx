'use client';
import React, {
  useState,
  useRef,
  useEffect,
  ReactNode,
  Children,
  cloneElement,
  isValidElement,
} from 'react';
import { cva, VariantProps } from 'class-variance-authority';
import { cn } from '@/styles';

const selectStyles = cva(
  'relative inline-block w-full rounded-full border cursor-pointer transition-colors duration-200',
  {
    variants: {
      intent: {
        default: 'bg-white border-gray-300 text-gray-800 hover:bg-gray-50',
        outline: 'bg-transparent border-green-500 text-gray-800',
        filled: 'bg-green-600 border-green-600 text-white hover:bg-green-700',
      },
      isOpen: {
        true: 'border-green-500 ring-2 ring-green-200',
        false: '',
      },
    },
    defaultVariants: { intent: 'default' },
  }
);

const dropdownStyles = cva(
  'absolute z-50 mt-2 w-full bg-white rounded-xl shadow-lg border border-gray-200 text-[#1d1d1d] select-none',
  {
    variants: { isOpen: { true: 'block', false: 'hidden' } },
  }
);

interface SelectProps extends VariantProps<typeof selectStyles> {
  children: ReactNode;
  value: string | string[];
  onChange: (value: string | string[]) => void;
  placeholder: string;
  multiple?: boolean;
}

interface SelectOptionProps {
  children: ReactNode;
  value: string;
  onClick?: (event: React.MouseEvent) => void;
  isSelected?: boolean;
  isCheckbox?: boolean;
}

export function Select({
  children,
  value,
  onChange,
  placeholder,
  intent,
  multiple = false,
}: SelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) setIsOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleOptionClick = (optionValue: string) => {
    if (multiple) {
      const currentValue = (value as string[]) || [];
      const newValue = currentValue.includes(optionValue)
        ? currentValue.filter((v) => v !== optionValue)
        : [...currentValue, optionValue];
      onChange(newValue);
    } else {
      onChange(optionValue);
      setIsOpen(false);
    }
  };

  const getDisplayLabel = () => {
    if (multiple) {
      const values = Array.isArray(value) ? value : [];
      if (values.length === 0) return placeholder;
      const labels: string[] = [];
      Children.forEach(children, (child) => {
        if (isValidElement(child)) {
          const optionChild = child as React.ReactElement<SelectOptionProps>;
          if (values.includes(optionChild.props.value)) {
            if (typeof optionChild.props.children === 'string')
              labels.push(optionChild.props.children);
          }
        }
      });
      if (labels.length === 1) return labels[0];
      return `${placeholder} (${labels.length})`;
    }
    if (!value) return placeholder;
    let selectedLabel = '';
    Children.forEach(children, (child) => {
      if (isValidElement(child)) {
        const optionChild = child as React.ReactElement<SelectOptionProps>;
        if (optionChild.props.value === value) selectedLabel = optionChild.props.children as string;
      }
    });
    return selectedLabel || placeholder;
  };

  return (
    <div
      className={cn(selectStyles({ intent, isOpen }))}
      onClick={() => setIsOpen(!isOpen)}
      ref={ref}
    >
      <div className="flex items-center justify-between px-4 py-2 truncate">
        <span className="truncate">{getDisplayLabel()}</span>
        <svg
          className={`w-5 h-5 ml-2 shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          ></path>
        </svg>
      </div>
      <div className={cn(dropdownStyles({ isOpen }))}>
        <div className="p-2 space-y-1">
          {Children.map(children, (child) => {
            if (!isValidElement(child)) return null;
            const optionChild = child as React.ReactElement<SelectOptionProps>;
            const isSelected = multiple
              ? Array.isArray(value) && value.includes(optionChild.props.value)
              : value === optionChild.props.value;
            return cloneElement(optionChild, {
              onClick: (e: React.MouseEvent) => {
                e.stopPropagation();
                handleOptionClick(optionChild.props.value);
              },
              isSelected,
              isCheckbox: multiple,
            });
          })}
        </div>
      </div>
    </div>
  );
}

// --- ПОЛНОСТЬЮ ИСПРАВЛЕННЫЙ КОМПОНЕНТ SelectOption ---
export function SelectOption({
  children,
  onClick,
  isSelected,
  isCheckbox = false,
}: SelectOptionProps) {
  // Для одиночного выбора (без чекбокса)
  if (!isCheckbox) {
    return (
      <div
        className={`p-2 rounded-md hover:text-[#009B3E] cursor-pointer ${isSelected ? 'font-bold' : ''}`}
        onClick={onClick}
      >
        {children}
      </div>
    );
  }

  // Для множественного выбора с чекбоксами
  return (
    <label
      className={`flex items-center p-2 rounded-md hover:text-[#009B3E] cursor-pointer ${isSelected ? 'font-bold' : ''}`}
      onClick={(e) => {
        e.preventDefault(); // не даём label кликать второй раз
        onClick?.(e);
      }}
    >
      <input type="checkbox" className="sr-only" checked={!!isSelected} onChange={() => {}} />

      <div
        className={cn(
          'w-[18px] h-[18px] rounded-sm border_solid border-[#009B3E] mr-3 inline-flex justify-center items-center',
          !!isSelected ? 'bg-[#009B3E] border-none' : 'bg-white'
        )}
      >
        {!!isSelected ? (
          <svg
            width="15"
            height="15"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9.5501 18.0016L3.8501 12.3016L5.2751 10.8766L9.5501 15.1516L18.7251 5.97656L20.1501 7.40156L9.5501 18.0016Z"
              fill="white"
            />
          </svg>
        ) : null}
      </div>

      {children}
    </label>
  );
}
