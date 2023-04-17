import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import { type NextPage } from "next";
import { useRouter } from "next/router";

import {
  createServerSupabaseClient,
  User,
} from "@supabase/auth-helpers-nextjs";
import { type GetServerSidePropsContext } from "next";

const createArticle: NextPage = () => {
  const supabaseClient = useSupabaseClient();
  const user = useUser();
  const router = useRouter();

  return <div>createArticle</div>;
};

export default createArticle;

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  // Create authenticated Supabase Client
  const supabase = createServerSupabaseClient(ctx);
  // Check if we have a session
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session)
    return {
      redirect: {
        destination: "/auth",
        permanent: false,
      },
    };

  return {
    props: {
      initialSession: session,
      user: session.user,
    },
  };
};
