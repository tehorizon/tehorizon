import { deliveryDetails, locationObj } from ".";

export interface Delivery_Locations {
  data: deliveryDetails;
}

export type Location_Details = {
  data: locationObj;
} | null;
