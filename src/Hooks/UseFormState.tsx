import { useState, useEffect } from "react";

interface UserData {
  firstName: string;
  lastName?: string;
  email?: string;
  city?: string;
  phone?: string[] | null;
}

const useFormState = (initialData: UserData) => {
  const [formData, setFormData] = useState<UserData>(initialData);

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  return [formData, setFormData] as const;
};

export default useFormState;
