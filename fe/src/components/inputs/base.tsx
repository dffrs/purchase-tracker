import { forwardRef, FunctionComponent, InputHTMLAttributes } from "react";

type InputProps = { label: string } & InputHTMLAttributes<HTMLInputElement>;

const BASE_STYLE = `
bg-transparent 
border-x-0 border-t-0 border-2 border-contrast 
text-pop 
transition-transform 
focus:outline-none focus:scale-105
placeholder:text-contrast placeholder:opacity-50 placeholder:text-sm placeholder:italic
`;

export const Input: FunctionComponent<InputProps> = forwardRef<
  HTMLInputElement,
  InputProps
>(({ id, label, className = "", ...props }, ref) => {
  return (
    <fieldset className="flex flex-col border-none">
      <label htmlFor={id} className="text-contrast">
        {label}
      </label>
      <input
        ref={ref}
        id={id}
        className={`${BASE_STYLE} ${className}`}
        {...props}
      />
    </fieldset>
  );
});

Input.displayName = "Input";
