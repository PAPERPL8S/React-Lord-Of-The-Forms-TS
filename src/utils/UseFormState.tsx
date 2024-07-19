import { Component, ComponentType } from "react";
import { UserData } from "./types";
import { getInitialFormData } from "../utils/transformations";

interface FormStateHandlerProps {
  initialState: UserData;
}

interface FormStateHandlerState {
  formState: UserData;
}

export const withFormState = (WrappedComponent: ComponentType<any>) => {
  return class FormStateHandler extends Component<
    FormStateHandlerProps,
    FormStateHandlerState
  > {
    constructor(props: FormStateHandlerProps) {
      super(props);

      this.state = {
        formState: getInitialFormData(this.props.initialState),
      };

      this.setFormState = this.setFormState.bind(this);
    }

    setFormState(newState: UserData) {
      this.setState({ formState: newState });
    }

    render() {
      return (
        <WrappedComponent
          {...this.props}
          formState={this.state.formState}
          setFormState={this.setFormState}
        />
      );
    }
  };
};
