import React, { useEffect, useState } from "react";
import { NextRouter, useRouter } from "next/router";
import { isJSDocAllType } from "typescript";
import { prisma } from "../../../lib/prisma";
import Link from "next/link";
import { useForm } from "react-hook-form";

const Article = ({ article }) => {
  const [edit, setEdit] = useState(false);
  const { register, handleSubmit, reset, setValue } = useForm();
  const router = useRouter();

  const refreshData = () => {
    router.replace(router.asPath);
  };

  useEffect(() => {
    // Update the document title using the browser API
    setValue("body", article.body);
  }, [edit]);

  const onSubmit = async (data) => {
    const post = {
      title: article.title,
      body: data.body,
      // user: {
      //   email: session?.user?.email,
      //   name: session?.user?.name,
      // }
    };
    reset();

    // update new record in with same artid
    try {
      fetch(`http://localhost:3000/api/article/${article.artid}`, {
        body: JSON.stringify(post),
        headers: {
          "Content-type": "application/json",
        },
        method: "PUT",
      }).then((res) => {
        console.log(res);
        refreshData()
        setEdit(false)
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditPress = () => {
    setEdit(!edit);
  };

  console.log(article)

  if (!edit) {
    return (
      <div className="grid text-white py-4">
        <h1 className="text-4xl flex justify-center font-bold">
          {article.title}
        </h1>
        <p className="flex justify-center py-8">Written by: </p>
        <div className="border mx-10 border-gray-700 mb-4" />
        <p className="flex text-justify justify-self-center whitespace-pre-line mb-8 w-[50%]">
          {article.body}
        </p>
        <div className="border mx-10 border-gray-700 my-4" />
        <div className="flex justify-center whitespace-pre-line ">
          <Link
            href="/"
            className="w-[100px] mx-2 mb-8 border p-4 rounded-lg ease-out duration-300 hover:shadow-lg hover:shadow-slate-50/20 text-center"
          >
            Go Back
          </Link>
          <button
            onClick={handleEditPress}
            className="w-[100px] mx-2 mb-8 border p-4 rounded-lg ease-out duration-300 hover:shadow-lg hover:shadow-slate-50/20"
          >
            Edit
          </button>
        </div>
      </div>
    );
  } else {
    return (
      <div className="grid text-white py-4">
        <h1 className="text-4xl flex justify-center font-bold">
          {article.title}
        </h1>
        <p className="flex justify-center py-8">Written by: </p>
        <div className="border mx-10 border-gray-700 mb-4" />

        <div className="flex text-justify justify-self-center mb-8">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col justify-center w-[600px]"
          >
            <h1 className="text-center text-white text-2xl w-[100%] mt-8">
              Editting mode...
            </h1>
            <textarea
              {...register("body")}
              className="w-[100%] h-[500px] block bg-black border mb-2 rounded border-sky-500 shadow-md shadow-sky-500/50"
              placeholder="Body"
            />
            <input
              type="submit"
              className="block bg-black border my-2 w-[30%] rounded border-sky-500
              shadow-md shadow-sky-500/50
              hover:bg-white hover:text-black cursor-pointer"
            />
          </form>
        </div>

        <div className="border mx-10 border-gray-700 my-4" />
        <div className="flex justify-center whitespace-pre-line ">
          <Link
            href="/"
            className="w-[100px] mx-2 mb-8 border p-4 rounded-lg ease-out duration-300 hover:shadow-lg hover:shadow-slate-50/20 text-center"
          >
            Go Back
          </Link>
          <button
            onClick={handleEditPress}
            className="w-[100px] mx-2 mb-8 border p-4 rounded-lg ease-out duration-300 hover:shadow-lg hover:shadow-slate-50/20"
          >
            Edit
          </button>
        </div>
      </div>
    );
  }
};

// loads on response time
export const getServerSideProps = async (context) => {
  const res = await fetch(
    `http://localhost:3000/api/article/${context.params.id}`
  );
  const article = await res.json();

  console.log(article);

  return {
    props: {
      article,
    },
  };
};

// export const getStaticProps = async (context) => {
//   const articles = await prisma.article.findMany({
//     select: {
//       title: true,
//       artid: true,
//       body: true,
//     }
//   })

//   return {
//     props: {
//       articles
//     }
//   }
// }

// // loads all static page on build time to use this function you need getStaticProps defined
// // the return value of this method will be used by the getStaticProps to generate all websites with id inside the params: object
// export const getStaticPaths = async () => {
//   const res = await fetch(`https://jsonplaceholder.typicode.com/comments`);
//   const article = await res.json();

//   // get list of id's to load beforehand
//   const iDsToLoad = article.map((article: jsData) => {
//     return article.id;
//   });
//   // array of {param: {id: string}} the required format
//   const paths = iDsToLoad.map((id: number) => {
//     return ({params: {id: id.toString()}})
//   });

//   return {
//     paths,
//     // if we go to something that doesnt exist it will return 404
//     fallback: false,
//   };
// };

export default Article;
