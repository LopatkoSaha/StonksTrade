import { useState, useEffect } from "react";

export const useLocalStorage = <T extends string | null>(key: string) => {
  
  const stored = localStorage.getItem(key);
  const [localStor, setLocalStor] = useState<T | null>(stored as T);

  const setLocalStorage = ( value: T ) => {
    if(value === null) return localStorage.removeItem(key);
    localStorage.setItem(key, value);
    setLocalStor(value);
  };

  return [localStor, setLocalStorage] as const;
};
