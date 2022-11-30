import { Session } from "next-auth";
import { signOut, useSession } from "next-auth/react";
import React from "react";

const Nav = () => {

  const { data: session } = useSession();

  // check if user is logged in
  let isLoggedIn: Session | null = session;


  return (
    <nav className="flex z-40 justify-between bg-[#282A3A] py-2 rounded h-16 sticky top-0">
      <div className="text-white md:bg-transparent md:p-0 text-white text-[1rem] my-[20px] md:ml-4 ml-2">
        <div className="flex">
        {isLoggedIn && `Currently signed in as: ${session?.user?.email}`}
        {isLoggedIn && <p onClick={() => {
              signOut();
            }} className="md:pl-8 pl-2 underline cursor-pointer">Sign Out</p>}
        </div>
      </div>
      <div
        className="hidden w-full md:block md:w-auto flex-end"
        id="navbar-default"
      >
        <ul className="flex flex-col p-4 mt-4 rounded-lg md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium pr-8 w-[100%]">
          <li>
            <a
              href="/"
              className="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white text-[2rem]"
              aria-current="page"
            >
              Home
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Nav;
