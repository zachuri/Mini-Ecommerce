/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const Products = () => {
  const supabaseClient = useSupabaseClient();
  const [products, setProducts] = useState<{ [x: string]: any }[]>();

  useEffect(() => {
    void getProducts();
  }, []);

  const getProducts = async () => {
    try {
      const { data, error } = await supabaseClient
        .from("products")
        .select("*")
        .limit(10);

      if (error) throw error;
      console.log(data);
      if (data != null) {
        setProducts(data);
        console.log(products);
      }
    } catch (error: any) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      alert(error.message);
    }
  };

  return (
    <>
      <h1>Products Feed</h1>
      <>
        {products?.map((product) => {
          return (
            <>
              <div key={product.id}>
                <div className="rounded-xl border hover:border-black">
                  <p>Name: {product.name}</p>
                  <p>Description {product.description}</p>
                  <p>Product url: {product.image_url}</p>
                  <Image
                    src={product.image_url}
                    width={100}
                    height={100}
                    alt={"overlay"}
                  />
                </div>
              </div>
            </>
          );
        })}
      </>
    </>
  );
};

export default Products;
