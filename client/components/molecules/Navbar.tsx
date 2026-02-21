"use client";
import { themeStore } from "@/client/providers";
import {  Menu } from "lucide-react";
import { observer } from "mobx-react";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { FC } from "react";

export const Navbar: FC = observer(() => {
  const path = usePathname();
  const router = useRouter();
  const route = [
    {
      name: "Home",
      route: "/home",
    },
    {
      name: "Specs",
      route: "/specs",
    },
    {
      name: "Kit Reflow number",
      route: "/kit-reflow-number",
    },
    {
      name: "Config",
      route: "/config",
    },
  ];
  const routeGroupDesktop = () => {
    return (
      <div className="hidden gap-2 lg:flex">
        {route.map((item) => (
          <a
            key={item.route}
            className={`btn btn-sm ${
              path === item.route ? "btn-primary" : "btn-ghost"
            }`}
            onClick={() => {
              router.push(item.route);
            }}
          >
            {item.name}
          </a>
        ))}
      </div>
    );
  };
  const routeGroupMobile = () => {
    return (
      <div className="dropdown lg:hidden">
        <div tabIndex={0} className="btn btn-ghost btn-circle">
          {<Menu />}
        </div>
        <ul
          tabIndex={-1}
          className="dropdown-content menu rounded-box bg-base-100 gap-2 w-52 z-2 p-2 shadow"
        >
          {route.map((item) => (
            <li key={item.route}>
              <a
                className={`btn btn-sm ${path === item.route ? "btn-primary" : "btn-ghost"}`}
                onClick={() => {
                  router.push(item.route);
                }}
              >
                {item.name}
              </a>
            </li>
          ))}
        </ul>
      </div>
    );
  };
  return (
    <div className="navbar bg-base-200 border-base-300 fixed top-0 border-b z-10 shadow">
      <div className="navbar-start">
        <div className="flex items-center gap-2">
          <img
            src={"/reflow-profile-maker/favicon.ico"}
            alt="logo"
            rel="icon"
            className="rounded-box"
          />
          <span className="text-base-content text-md font-bold">
            Reflow Profile Maker
          </span>
        </div>
      </div>
      <div className="navbar-center">
        {routeGroupMobile()}
        {routeGroupDesktop()}
      </div>
      <div className="navbar-end">
        <button
          className="btn btn-md capitalize"
          onClick={themeStore.toggleTheme}
        >
          {themeStore.theme}
        </button>
      </div>
    </div>
  );
});
