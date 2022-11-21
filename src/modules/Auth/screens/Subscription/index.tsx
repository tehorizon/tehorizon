import React from "react";
import {useNavigation} from "@react-navigation/core";

import SubscriptionServiceComponent from "./index.service";
import SubscriptionComponent from "./index.ui";


const Subscription = () => {

    //navigation
    const navigation = useNavigation();

    //created separate component for business logic and view
    return(
        <SubscriptionServiceComponent navigation={navigation}>
            {(props: any) => <SubscriptionComponent {...props} />}
        </SubscriptionServiceComponent>
    )
}

export default Subscription
