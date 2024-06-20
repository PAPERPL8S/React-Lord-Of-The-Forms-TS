export const capitalize = (str: string): string => {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

export const formatPhoneNumber = (phoneNumber: string): string => {
    const matches = phoneNumber.match(/.{1,2}/g);
    const formattedPhoneNumber = matches ? matches.join("-") : "";
    return formattedPhoneNumber;
};