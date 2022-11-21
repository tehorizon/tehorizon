import React from "react";
import { StyleSheet, Text, View } from "react-native";
import ProfileService from "./index.service";
import ProfileUI from "./index.ui";

const Profile = () => {
  return (
    <ProfileService>{(props: any) => <ProfileUI {...props} />}</ProfileService>
  );
};

export default Profile;

const styles = StyleSheet.create({});
