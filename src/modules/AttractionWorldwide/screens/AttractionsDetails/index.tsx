import React from "react";
import AttractionsComponent from "./index.ui";
import AttractionsServiceComponent from "./index.service";

class AttractionsDetails extends React.Component {
  //created separate component for business logic and view
  render() {
    return (
      <AttractionsServiceComponent navigation={this.props.navigation}>
        {(props) => <AttractionsComponent {...props} />}
      </AttractionsServiceComponent>
    );
  }
}

export default AttractionsDetails;
