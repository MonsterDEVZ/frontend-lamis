export interface WarrantyItem {
  id: string;
  name: string;
  description: string;
  period: string;
  icon?: React.ReactNode;
}

export interface KeyRule {
  id: string;
  title: string;
  icon: React.ReactNode;
  items: KeyRuleItem[];
  iconBgColor: string;
  iconColor: string;
  bulletColor: string;
  hoverBorderColor: string;
}

export interface KeyRuleItem {
  id: string;
  text: string;
  bold?: string;
}

export interface WarrantySection {
  title: string;
  icon: React.ReactNode;
  content: React.ReactNode;
}
