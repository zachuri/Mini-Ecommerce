/* eslint-disable @typescript-eslint/restrict-plus-operands */
import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useEffect, useState } from "react";

const Home: NextPage = () => {
  const supabase = useSupabaseClient();

  const [posts, setPosts] = useState<{ [x: string]: any }[]>();

  useEffect(() => {
    void fetchProfiles();
  }, []);

  const fetchProfiles = async () => {
    const { data, error } = await supabase
      .from("posts")
      .select("*")
      .order("id");
    if (error) console.log("error", error);
    else setPosts(data);
  };

  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-4xl">Main Page</h1>
        <div className="flex flex-col gap-5">
          {posts?.map((post) => (
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            <div key={post.id}>
              <div> Title: {post.id}</div>
              <div> Title: {post.title}</div>
              <div> Description: {post.description}</div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;
