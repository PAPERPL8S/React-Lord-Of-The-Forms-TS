export interface FormData {
    firstName: string;
    lastName: string;
    email: string;
    city: string;
    phone: string[];
}

export const initialFormData: FormData = {
    firstName: "",
    lastName: "",
    email: "",
    city: "",
    phone: ["", "", "", ""],
};