import React from "react";
import { useSession, signIn, signOut } from "next-auth/react";

const GoogleLogin = () => {
  const { data: session } = useSession();

  if (session) {
    return (
      <div>
        <div className="flex justify-center pt-4">
          <img src={session.user?.image || ""} alt="" />
        </div>
      </div>
    );
  } else {
    return (
      <button
        className="text-2xl border border-solid border-2 py-2 px-8 
                                rounded border-sky-500 shadow-lg shadow-sky-500/50"
        onClick={() => {
          signIn();
        }}
      >
        Sign In
      </button>
    );
  }
};

export default GoogleLogin;
