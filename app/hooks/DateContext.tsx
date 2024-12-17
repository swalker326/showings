import { createContext, useContext, useState } from "react";

type DateModelContext = {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
  setSelectedDate: (date: Date) => void;
  selectedDate: Date;
};
const DateModalContext = createContext({} as DateModelContext);

export function DateContextProvider({
  children
}: {
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);
  const toggle = () => setIsOpen(!isOpen);

  return (
    <DateModalContext.Provider
      value={{ isOpen, open, close, toggle, setSelectedDate: setSelectedDate, selectedDate }}
    >
      {children}
    </DateModalContext.Provider>
  );
}

export const useDateContext = () => {
  const context = useContext(DateModalContext);
  if (!context) {
    throw new Error("useDateContext must be used within a DateContextProvider");
  }
  return context;
};
