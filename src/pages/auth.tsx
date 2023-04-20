import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import Account from "~/components/account";
import { useRouter } from "next/router";
import { useEffect } from "react";

const AuthPage: NextPage = () => {
  const supabase = useSupabaseClient();
  const router = useRouter();

  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session) {
        void router.back();
      }
    };

    void checkSession();
  });

  supabase.auth.onAuthStateChange((event) => {
    if (event == "SIGNED_IN") {
      void router.back();
    }
    if (event == "SIGNED_OUT") {
      void router.push("/");
    }
  });

  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <Auth
          supabaseClient={supabase}
          appearance={{ theme: ThemeSupa }}
          theme="dark"
          providers={["github", "apple"]}
        />
      </div>
    </>
  );
};

export default AuthPage;
