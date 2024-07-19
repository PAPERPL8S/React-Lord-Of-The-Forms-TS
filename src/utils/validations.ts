export const isEmailValid = (email: string): boolean => {
  const regex = /^\w+([-]?\w+)*@\w+([-]?\w+)*(\.\w{2,3})+$/;
  return regex.test(email);
};

export const isCityValid = (city: string, allCities: string[]): boolean => {
  return allCities.some((c) => c.toLowerCase() === city.toLowerCase());
};

export const isPhoneValid = (phone: string): boolean => {
  return /^\d{7}$/.test(phone);
};

export const isNameValid = (name: string): boolean => {
  return name.length >= 2 && /^[a-zA-Z\s]*$/.test(name);
};
