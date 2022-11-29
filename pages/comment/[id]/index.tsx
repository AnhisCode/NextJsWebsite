import React from "react";
import { NextRouter, useRouter } from "next/router";
import { isJSDocAllType } from "typescript";

interface jsData {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}

const Comment = ({ comment }) => {
  return (
    <div className="text-white py-4">
      <h1 className="flex justify-center text-center py-8">
        Commented by {comment.name}, email: {comment.email}
      </h1>
      <p className="flex justify-center text-center">{comment.body}</p>
    </div>
  );
};

// loads on response time
// export const getServerSideProps = async (context) => {
//     const res = await fetch(`https://jsonplaceholder.typicode.com/comments/${context.params.id}`)
//     const comment = await res.json()

//     return {
//         props: {
//             comment
//         }
//     }
// }

export const getStaticProps = async (context) => {
    const res = await fetch(`https://jsonplaceholder.typicode.com/comments/${context.params.id}`)
    const comment = await res.json()

    return {
        props: {
            comment
        }
    }
}

// loads all static page on build time to use this function you need getStaticProps defined
// the return value of this method will be used by the getStaticProps to generate all websites with id inside the params: object
export const getStaticPaths = async () => {
  const res = await fetch(`https://jsonplaceholder.typicode.com/comments`);
  const comment = await res.json();

  // get list of id's to load beforehand
  const iDsToLoad = comment.map((comment: jsData) => {
    return comment.id;
  });
  // array of {param: {id: string}} the required format
  const paths = iDsToLoad.map((id: number) => {
    return ({params: {id: id.toString()}})
  });

  return {
    paths,
    // if we go to something that doesnt exist it will return 404
    fallback: false,
  };
};

export default Comment;
