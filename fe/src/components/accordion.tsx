import {
  FunctionComponent,
  PropsWithChildren,
  useCallback,
  useState,
} from "react";
import { Icon } from "./icon";
import { IoCaretDown } from "react-icons/io5";

const WRAPPER_STYLES = `
bg-secondary text-contrast
shadow-lg rounded-xl 
outline outline-2 outline-constrast
cursor-pointer 
`;

type AccordionProps = {
  title: string;
  isOpen?: boolean;
};

export const Accordion: FunctionComponent<
  PropsWithChildren<AccordionProps>
> = ({ title, isOpen = false, children }) => {
  const [open, setOpen] = useState(() => isOpen);

  const onOpen = useCallback(() => {
    setOpen((prev) => !prev);
  }, []);

  return (
    <div className={WRAPPER_STYLES} onClick={onOpen}>
      <div className="bg-secondary p-4 rounded-xl outline outline-2 outline-constrast flex items-center justify-between shadow-lg">
        <p>{title}</p>
        <Icon
          title="Expand/Collapse"
          className={`text-xl ${open ? "rotate-180" : ""}`}
        >
          <IoCaretDown />
        </Icon>
      </div>
      <div
        className={`p-8 ${open ? "visible block" : "invisible hidden"}`}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};
