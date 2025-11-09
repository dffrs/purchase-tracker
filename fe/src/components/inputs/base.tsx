import { forwardRef, FunctionComponent, InputHTMLAttributes } from "react";

type InputProps = { label: string } & InputHTMLAttributes<HTMLInputElement>;

const BASE_STYLE = `
bg-transparent 
border-x-0 border-t-0 border-2 border-contrast 
text-pop 
focus:outline-none 
placeholder:text-contrast placeholder:opacity-50 placeholder:text-sm placeholder:italic
`;

export const Input: FunctionComponent<InputProps> = forwardRef<
  HTMLInputElement,
  InputProps
>(({ id, label, className = "", ...props }, ref) => {
  return (
    <fieldset className="border-none text-contrast">
      <label
        htmlFor={id}
        className="flex flex-col has-[:focus]:scale-105 transition-transform"
      >
        {label}
        <input
          ref={ref}
          id={id}
          className={`${BASE_STYLE} ${className}`}
          {...props}
        />
      </label>
    </fieldset>
  );
});

Input.displayName = "Input";
