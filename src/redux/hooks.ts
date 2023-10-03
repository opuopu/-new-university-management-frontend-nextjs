import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "./store";
import { useEffect, useState } from "react";

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
interface IDebounced {
  searchQuery: string;
  delay: number;
}
export const useDebounced = ({ searchQuery, delay }: IDebounced) => {
  const [debouncedValue, setDebounceValue] = useState(searchQuery);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebounceValue(searchQuery);

      return () => {
        clearTimeout(handler);
      };
    }, delay);
  }, [searchQuery, delay]);
  return debouncedValue;
};
