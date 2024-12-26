import React from "react";
import { useFetch } from "../../hooks/useFetch";

export const Profile = () => {

const [profileData,isLoading,error]=useFetch('/user/profile')

  return <div>Profile</div>;
};
