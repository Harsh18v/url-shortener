import { InputHTMLAttributes, forwardRef } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  hint?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, hint, id, className = "", ...props }, ref) => {
    const inputId = id ?? label.toLowerCase().replace(/\s+/g, "-");
    return (
      <div className="flex flex-col gap-1.5">
        <label htmlFor={inputId} className="text-sm font-medium text-ink">
          {label}
        </label>
        <input
          ref={ref}
          id={inputId}
          className={`rounded-sm border border-line bg-paper px-3.5 py-2.5 text-sm text-ink placeholder:text-muted transition-colors focus:border-knot focus:outline-none focus:ring-1 focus:ring-knot ${className}`}
          {...props}
        />
        {hint && <p className="text-xs text-muted">{hint}</p>}
      </div>
    );
  }
);
Input.displayName = "Input";

export default Input;
