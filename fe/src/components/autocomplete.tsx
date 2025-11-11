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
  const [filter, setFilter] = useState<string | undefined>(() => undefined);

  const shouldDisplayOptions = open && options.length > 0;

  const toggleDropdown = useCallback(() => {
    setOpen((prevState) => !prevState);
  }, []);

  const closeDropdown = useCallback(() => {
    setOpen(false);
  }, []);

  const onClick: React.MouseEventHandler<HTMLDivElement> = useCallback(() => {
    toggleDropdown();
  }, [toggleDropdown]);

  const onOutsideClick: React.MouseEventHandler<HTMLDivElement> = useCallback(
    (event) => {
      event.stopPropagation();
      closeDropdown();
    },
    [closeDropdown],
  );

  return (
    <div
      className="flex flex-col relative"
      onClick={onClick}
      onChange={(event) => {
        // TODO: clean & improve me
        const inputsValue = (event.target as HTMLInputElement).value;
        setFilter(inputsValue);
      }}
    >
      {children}
      {shouldDisplayOptions && (
        <>
          <ul className="card flex flex-col gap-y-2 max-h-40 overflow-y-auto absolute top-full w-full p-2 rounded shadow-xl z-20 text-pop outline-2 outline-pop cursor-pointer">
            {options.map(({ text, onClick }, i) => {
              if (filter && !text.includes(filter)) return null;

              return (
                <li
                  id={text}
                  data-name="autocomplete-option"
                  title={text}
                  key={`option-${i}-${text}`}
                  className="max-w-fit cursor-pointer overflow-ellipsis whitespace-nowrap overflow-clip"
                  onClick={(event) => {
                    event.stopPropagation();
                    onClick(event);
                    closeDropdown();
                  }}
                >
                  {text}
                </li>
              );
            })}
          </ul>
          <div
            onClick={onOutsideClick}
            className="fixed h-screen w-screen z-10 left-[50%] top-[50%] translate-y-[-50%] translate-x-[-50%]"
          />
        </>
      )}
    </div>
  );
};
