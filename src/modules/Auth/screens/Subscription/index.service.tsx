import { ScreenTypes } from "../../interfaces";

//component containing the business logic
const SubscriptionServiceComponent = (props : ScreenTypes.screen) => {

    //props
    const {children} = props;

    return children({
    });
};

export default SubscriptionServiceComponent;
