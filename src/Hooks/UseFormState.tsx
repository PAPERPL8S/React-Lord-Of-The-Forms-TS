import { useState, useEffect, useRef } from "react";
import { UserData } from "../utils/types";

const useFormState = (initialState: UserData) => {
  const [formState, setFormState] = useState<UserData>(initialState);
  const prevInitialStateRef = useRef<UserData>(initialState);

  useEffect(() => {
    if (
      JSON.stringify(prevInitialStateRef.current) !==
      JSON.stringify(initialState)
    ) {
      setFormState(initialState);
      prevInitialStateRef.current = initialState;
    }
  }, [initialState]);

  return [formState, setFormState] as const;
};

export default useFormState;
