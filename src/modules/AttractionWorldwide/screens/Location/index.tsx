import React from 'react';
import LocationComponent from './index.ui';
import LocationServiceComponent from './index.service';

class Location extends React.Component {
  //created separate component for business logic and view
  render() {
    return (
      <LocationServiceComponent navigation={this.props.navigation}>
        {props => <LocationComponent {...props} />}
      </LocationServiceComponent>
    );
  }
}

export default Location;
