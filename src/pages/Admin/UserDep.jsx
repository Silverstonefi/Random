import React, { useEffect, useState } from "react";
import AdminNav from "./AdminNav";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Users from "./Users";
import DepApp from "./DepApp";

const UserDep = () => {
  const notify = () => {
    toast("Deleted");
    setReload((reload) => !reload);
  };
  const [reload, setReload] = useState(false);
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("https://doubtful-foal-suspenders.cyclic.app/deposits", {
      method: "get",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((res) => {
        //console.log("usersssssssssss", res.users);
        setUsers(res.users);
      })
      .catch((err) => console.log("errrrrrrr", err));
  }, [reload]);

  return (
    <div className="px-0 lg:px-0 w-full">
      <div>
        <AdminNav />
        <div className="px-4 md:px-10 mx-auto w-full m-24">
          <div>
            <div class="text-2xl font-semibold mb-4 text-center default_cursor_cs">
              All Users on the site
            </div>
            <input
              type="text"
              placeholder="search here..."
              class="mx-auto block py-2 rounded px-2 my-2"
              onChange={(event) => {
                setSearch(event.target.value);
                console.log("ssssss", search);
              }}
            />
            <div className="px-3 grid grid-cols-1 md:grid-cols-2">
              {users
                .filter((user) => {
                  if (search == "") {
                    return user;
                  } else if (
                    user.email.toLowerCase().includes(search.toLowerCase()) ||
                    user.name.toLowerCase().includes(search.toLowerCase())
                  ) {
                    return user;
                  }
                })
                .map((user, i) => {
                  return <DepApp key={i} user={user} notify={notify} />;
                })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDep;
