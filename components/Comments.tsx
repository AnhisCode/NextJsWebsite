import Link from "next/link";
import React from "react";

const Comments = ({ jsonData }) => {
  console.log(jsonData);

  return (
    <ul className="pt-4 grid sm:grid-cols-2 md:grid-cols-3 gap-8 px-16 ">
      {jsonData.map((data: jsData, index: number) => {
        return (
          <Link key={index} href="comment/[id]" as={`/comment/${data.id}`}>
            <li
              className="py-2 bg-[#282A3A] text-center border hover:border-sky-500
          hover:shadow-lg hover:shadow-sky-500/50"
            >
              <p className="p-4">{data.body}</p>
            </li>
          </Link>
        );
      })}
    </ul>
  );
};

export default Comments;
