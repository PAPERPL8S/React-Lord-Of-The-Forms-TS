import { useState, useEffect } from "react";
import { UserData } from "../utils/types";
import { initialFormDataFn } from "../utils/InitialFormData";

const useFormState = (initialState: UserData) => {
  const [formState, setFormState] = useState<UserData>(initialState);

  useEffect(() => {
    setFormState(initialFormDataFn(initialState));
  }, [initialState]);

  return [formState, setFormState] as const;
};

export default useFormState;
