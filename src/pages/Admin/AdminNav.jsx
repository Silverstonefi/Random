import React from "react";
import { MenuOutlined } from "@ant-design/icons";
import { Dropdown, Space } from "antd";
import { Link } from "react-router-dom";
import Logo from "../../components/Assets/logo";

const AdminNav = () => {
  const items = [
    {
      label: (
        <Link to="/admin/users" className="font-semibold">
          All Users
        </Link>
      ),
      key: "0",
    },
    {
      label: (
        <Link to="/admin/transactions" className="font-semibold">
          Transactions
        </Link>
      ),
      key: "1",
    },
    // {
    //   label: (
    //     <Link to="/admin/deposits" className="font-semibold">
    //       deposit
    //     </Link>
    //   ),
    //   key: "3",
    // },
  ];
  return (
    <div>
      <nav className="flex justify-between items-center pt-5 px-7 w-full">
        <div>
          <Dropdown
            menu={{
              items,
            }}
            trigger={["click"]}
          >
            <Link to='/' onClick={(e) => e.preventDefault()}>
              <MenuOutlined />
            </Link>
          </Dropdown>
        </div>
        <div>
          <Logo/>
        </div>
        <div>
          <button class="btn btn-ghost btn-circle default_pointer_cs">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5 default_pointer_cs"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                class="default_pointer_cs"
              ></path>
            </svg>
          </button>
          <button class="btn btn-ghost btn-circle default_pointer_cs">
            <div class="indicator">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 default_pointer_cs"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                ></path>
              </svg>
              <span class="badge badge-xs badge-primary indicator-item default_pointer_cs"></span>
            </div>
          </button>
        </div>
      </nav>
    </div>
  );
};

export default AdminNav;
