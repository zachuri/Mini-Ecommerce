import React from "react";
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import Link from "next/link";

const Navbar = () => {
  const supabaseClient = useSupabaseClient();
  const user = useUser();
  const router = useRouter();

  return (
    <>
      <div className="border border-black p-5 ">
        <div className="grid grid-cols-3">
          <div className="flex items-center justify-center border">
            <Link href={"/"}>Website</Link>
          </div>
          <div className="border"></div>
          <div className="flex items-center justify-center border">
            {!user ? (
              <Link href={"/auth"}>
                <div className="rounded-xl border p-2">Login</div>
              </Link>
            ) : (
              <div className="flex flex-col items-center justify-center">
                <div>Hey, {user.email}</div>
                <div>
                  <button
                    className="rounded-xl border p-2"
                    onClick={() => {
                      void supabaseClient.auth.signOut();
                    }}
                  >
                    Sign Out{" "}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
