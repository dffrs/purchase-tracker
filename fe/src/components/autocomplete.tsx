import {
  FunctionComponent,
  PropsWithChildren,
  useCallback,
  useState,
} from "react";

export type ACOption = {
  text: string;
  onClick: React.MouseEventHandler<HTMLLIElement>;
};

type AutocompleteProps = { options: Array<ACOption> };

export const Autocomplete: FunctionComponent<
  PropsWithChildren<AutocompleteProps>
> = ({ children, options }) => {
  const [open, setOpen] = useState(() => false);

  const toggleDropdown = useCallback(() => {
    setOpen((prevState) => !prevState);
  }, []);

  const closeDropdown = useCallback(() => {
    setOpen(false);
  }, []);

  const openDropdown = useCallback(() => {
    setOpen(true);
  }, []);

  const onClick: React.MouseEventHandler<HTMLDivElement> = useCallback(
    (event) => {
      const ct = event.currentTarget;
      const name = ct.dataset["name"];

      if (name === "autocomplete-option") return;

      toggleDropdown();
    },
    [toggleDropdown],
  );

  return (
    <div
      className="flex flex-col relative"
      onClick={onClick}
      onFocus={openDropdown}
      // TODO: fix me
      onBlur={closeDropdown}
    >
      {children}
      {open && (
        <ul className="card absolute top-full w-full inline-block p-2 rounded shadow-xl z-10 text-pop outline-2 outline-pop cursor-pointer">
          {options.map(({ text, onClick }, i) => {
            return (
              <li
                id={text}
                data-name="autocomplete-option"
                title={text}
                key={`option-${i}-${text}`}
                className="max-w-fit truncate"
                onClick={onClick}
              >
                {text}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};
