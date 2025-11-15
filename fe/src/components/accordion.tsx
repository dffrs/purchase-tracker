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
`;

type AccordionProps = {
  isOpen?: boolean;
  header: React.ReactNode;
};

export const Accordion: FunctionComponent<
  PropsWithChildren<AccordionProps>
> = ({ header, isOpen = false, children }) => {
  const [open, setOpen] = useState(() => isOpen);

  const onOpen = useCallback(() => {
    setOpen((prev) => !prev);
  }, []);

  return (
    <div className={WRAPPER_STYLES} onClick={onOpen}>
      <div className="bg-secondary p-4 rounded-xl outline outline-2 outline-constrast flex items-center justify-between shadow-lg cursor-pointer">
        {header}
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
