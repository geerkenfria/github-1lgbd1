import React from 'react';
import { Check } from 'lucide-react';
import { cn } from '../../utils/cn';

interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label: string;
}

export const Checkbox: React.FC<CheckboxProps> = ({ label, className, ...props }) => {
  return (
    <label className="group flex items-center p-2 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
      <div className="relative flex items-center">
        <input
          type="checkbox"
          className="peer sr-only"
          {...props}
        />
        <div className={cn(
          "w-5 h-5 border-2 rounded transition-all duration-200",
          "border-gray-300 bg-white",
          "peer-checked:border-blue-600 peer-checked:bg-blue-600",
          "peer-focus:ring-2 peer-focus:ring-blue-500 peer-focus:ring-offset-2",
          "flex items-center justify-center"
        )}>
          <Check className={cn(
            "w-3.5 h-3.5 text-white transition-transform duration-200",
            props.checked ? "scale-100" : "scale-0"
          )} />
        </div>
        <span className="ml-3 text-sm text-gray-700 group-hover:text-gray-900">
          {label}
        </span>
      </div>
    </label>
  );
}