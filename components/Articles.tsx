import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

const Articles = ({ articles }) => {
  const { data: session } = useSession();
  const router = useRouter()

  const refreshData = () => {
    router.replace(router.asPath)
  }

  const handleDelete = async (artID: string) => {
    try {
      fetch(`http://localhost:3000/api/article/${artID}`, {
        headers: {
          'Content-type' : 'application/json'
        },
        method: 'DELETE'
      }).then((res) => {
        console.log(res)
        refreshData();
      })
    } catch(error) {
      console.log(error)
    }
  }

  return (
    <ul className="pt-4 md:px-32 px-2">
      {articles.map((data, index: number) => {
        return (
          <div key={index}>
          <Link  href="article/[id]" as={`/article/${data.artid}`}>
            <li
              className="py-2 bg-[#282A3A] text-center border hover:border-sky-500
          hover:shadow-lg hover:shadow-sky-500/50 h-[300px] flex flex-col p-8 relative rounded-lg mb-1 ease-out duration-300"
            >
              <div className="">
                <p className="md:text-4xl text-2xl font-bold float-left text-left text-ellipsis overflow-hidden">{data.title}</p>
              </div>
              <div className="text-left mb-4">Written by: <span className="font-bold"> {session?.user?.name} </span></div>
              <div className="text-left text-ellipsis overflow-hidden">
              {data.body}
              </div>
            </li>
          </Link>
          <button onClick={() =>{
            handleDelete(data.artid)
          }} className="mb-8 border border-rose-500 rounded-lg p-1 font-bold bg-rose-500 ease-out duration-300 hover:shadow-lg hover:shadow-rose-500/20">Delete</button></div>
        );
      })}
    </ul>
  );
};

export default Articles;
