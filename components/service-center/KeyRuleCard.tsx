import React from 'react';

interface KeyRuleItem {
  text: string;
  bold?: string;
}

interface KeyRuleCardProps {
  title: string;
  icon: React.ReactNode;
  items: KeyRuleItem[];
  iconBgColor: string;
  iconColor: string;
  bulletColor: string;
  hoverBorderColor: string;
}

export const KeyRuleCard: React.FC<KeyRuleCardProps> = ({
  title,
  icon,
  items,
  iconBgColor,
  bulletColor,
  hoverBorderColor,
}) => {
  return (
    <div
      className={`bg-white rounded-2xl p-6 lg:p-8 shadow-sm hover:shadow-xl transition-all duration-300 border-2 border-transparent ${hoverBorderColor}`}
    >
      <div className="flex items-center gap-3 mb-6">
        <div
          className={`w-12 h-12 ${iconBgColor} rounded-xl flex items-center justify-center shrink-0`}
        >
          {icon}
        </div>
        <h3 className="text-xl font-bold text-gray-900">{title}</h3>
      </div>
      <ul className="space-y-4">
        {items.map((item, index) => (
          <li key={index} className="flex items-start gap-3">
            <span className={`${bulletColor} mt-1 shrink-0`}>
              {bulletColor.includes('blue') ? '✓' : bulletColor.includes('green') ? '→' : '×'}
            </span>
            <span className="text-gray-700 text-sm leading-relaxed">
              {item.bold && <strong>{item.bold}</strong>} {item.text}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};
