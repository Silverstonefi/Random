import React from "react";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBinLine } from "react-icons/ri";
import { setAdUser } from "../../Redux/action";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const Users = ({ user, notify }) => {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  // let history = useHistory();
  const Edituser = () => {
    console.log("usersssssssssss");
    dispatch(setAdUser(user));
    navigate("/admin/edituser", { replace: true });
  };

  const onDel = async () => {
    const { email } = user;
    const isNotThere = await fetch(
      "https://rest.silverstonefi.com/deleteuser",
      {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      }
    );
    let resp = await isNotThere.json();
    console.log("edit resp", resp);
    notify("deleted");
  };

  return (
    <div class="lg:p-5 p-3 border rounded-md text-black shadow-xl border-white  flex-1 flex justify-between lg:items-center lg:flex-row flex-col gap-3">
      <div class="text-base font-semibold gap-5">
        <p>{`Name: ${user.firstName}`}</p>
        <p>{`Email: ${user.email}`}</p>
        <p>{`Account Number: ${user.accountNumber}`}</p>
      </div>
      <div className="text-gray-600 ml-5 flex lg:justify-between self-end gap-2">
        <FiEdit
          className="text-blue-300 cursor-pointer"
          size={34}
          onClick={Edituser}
        />
        <RiDeleteBinLine
          className="text-red-400 cursor-pointer"
          size={34}
          onClick={onDel}
        />
      </div>
    </div>
  );
};

export default Users;
