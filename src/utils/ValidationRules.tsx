export const validationRules = [
  {
    field: "firstName",
    validate: (value: string) => value.length >= 2 && !/\d/.test(value),
    errorMessage:
      "First name must be at least 2 characters long and should not contain numbers",
  },
  {
    field: "lastName",
    validate: (value: string) => value.length >= 2 && !/\d/.test(value),
    errorMessage:
      "Last name must be at least 2 characters long and should not contain numbers",
  },
  {
    field: "email",
    validate: (value: string) => /\S+@\S+\.\S+/.test(value),
    errorMessage: "Email is Invalid",
  },
  {
    field: "city",
    validate: (value: string) => value.length > 0,
    errorMessage: "City is Invalid",
  },
  {
    field: "phone",
    validate: (value: string) => /^\d{10}$/.test(value),
    errorMessage: "Invalid Phone Number",
  },
];
