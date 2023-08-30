import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";

const useProtectedAdmin = () => {
  const history = useHistory();
  const isAdmin = useSelector((state) => state.Login.user_details.admin);
  console.log("is admin????", isAdmin);
  useEffect(() => {
    if (!isAdmin) {
      history.push("/auth/login");
    }
  });
  return isAdmin;
};

export default useProtectedAdmin;
