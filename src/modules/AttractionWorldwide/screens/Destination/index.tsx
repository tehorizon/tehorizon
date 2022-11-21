import React from 'react';
import DestinationComponent from './index.ui';
import DestinationServiceComponent from './index.service';

class Destination extends React.Component {
  //created separate component for business logic and view
  render() {
    return (
      <DestinationServiceComponent navigation={this.props.navigation}>
        {props => <DestinationComponent {...props} />}
      </DestinationServiceComponent>
    );
  }
}

export default Destination;
