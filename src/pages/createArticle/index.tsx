import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import { type NextPage } from "next";
import { useRouter } from "next/router";
import {
  createServerSupabaseClient,
  User,
} from "@supabase/auth-helpers-nextjs";
import { type GetServerSidePropsContext } from "next";
import { type ChangeEvent, useState } from "react";

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

const CreateArticle: NextPage = () => {
  const supabaseClient = useSupabaseClient();
  const user = useUser();
  const router = useRouter();
  const initialState = {
    title: "",
    content: "",
  };

  const [articleData, setArticleData] = useState(initialState);

  // Handle change any to make it any input type
  const handleChange = (e: any) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    setArticleData({ ...articleData, [e.target.name]: e.target.value });
    console.log(articleData);
  };

  return (
    <>
      <div className="flex items-center justify-center">
        <div className="flex flex-col justify-center">
          <h1 className="text-4xl">Title</h1>
          <input
            name="title"
            className="rounded-xl border p-5"
            placeholder="Title"
            onChange={handleChange}
          />
          <h1 className="text-4xl">Description</h1>
          <textarea
            name="description"
            className="rounded-xl border p-5"
            placeholder="Description"
            onChange={handleChange}
          />
          <p>Posting as {user?.email}</p>
          <button className="rounded-xl border bg-blue-600 p-2 text-white">
            Create Post
          </button>
        </div>
      </div>
    </>
  );
};

export default CreateArticle;
