import { Component } from "react";
import ClassForm from "./ClassForm";
import { UserData } from "../utils/types";
import ProfileInformation from "../ProfileInformation";

interface ClassAppState {
  userData: UserData;
  submitted: boolean;
}

const defaultUser: UserData = {
  email: "",
  firstName: "",
  lastName: "",
  phone: ["", "", "", ""],
  city: "",
};

export class ClassApp extends Component<{}, ClassAppState> {
  state: ClassAppState = {
    userData: defaultUser,
    submitted: false,
  };

  handleFormSubmit = (formData: UserData) => {
    this.setState({ userData: formData, submitted: true });
  };

  render() {
    const { userData, submitted } = this.state;
    return (
      <>
        <h2>Class</h2>
        <ProfileInformation userData={userData} submitted={submitted} />
        <ClassForm userData={defaultUser} onSubmit={this.handleFormSubmit} />
      </>
    );
  }
}
