import React, { Component } from "react";
import { ValidationRule } from "../utils/ValidationRules";

interface FormData {
  [key: string]: any;
}

const convertToString = (value: any) => {
  if (Array.isArray(value)) {
    return value.join("");
  } else if (typeof value === "string") {
    return value;
  } else if (value instanceof String) {
    return value.toString();
  } else {
    return "";
  }
};

interface ValidationComponentProps {
  formData: FormData;
  validationRules: ValidationRule[];
  children: (validationProps: ValidationProps) => React.ReactNode;
}

interface ValidationComponentState {
  errors: Record<string, string>;
  touched: Record<string, boolean>;
}

interface ValidationProps {
  errors: Record<string, string>;
  touched: Record<string, boolean>;
  validate: () => boolean;
  markTouched: (field: string) => void;
}

class ValidationComponent extends Component<
  ValidationComponentProps,
  ValidationComponentState
> {
  constructor(props: ValidationComponentProps) {
    super(props);

    this.state = {
      errors: {},
      touched: {},
    };
  }

  componentDidMount() {
    this.validateForm();
  }

  componentDidUpdate(prevProps: ValidationComponentProps) {
    if (prevProps.formData !== this.props.formData) {
      this.validateForm();
    }
  }

  validateForm() {
    const { formData, validationRules } = this.props;
    const errors: Record<string, string> = {};

    validationRules.forEach(({ field, validate, errorMessage }) => {
      const value = convertToString(formData[field]);
      if (!validate(value)) {
        errors[field] = errorMessage;
      }
    });

    this.setState({ errors });
  }

  validate = () => {
    const { formData, validationRules } = this.props;
    const errors: Record<string, string> = {};

    validationRules.forEach(({ field, validate, errorMessage }) => {
      const value = convertToString(formData[field]);
      if (!validate(value)) {
        errors[field] = errorMessage;
      }
    });

    this.setState({ errors });
    return Object.keys(errors).length === 0;
  };

  markTouched = (field: string) => {
    this.setState((prevState) => ({
      touched: {
        ...prevState.touched,
        [field]: true,
      },
    }));
  };

  render() {
    const { children } = this.props;
    const { errors, touched } = this.state;

    return children({
      errors,
      touched,
      validate: this.validate,
      markTouched: this.markTouched,
    });
  }
}

export default ValidationComponent;
