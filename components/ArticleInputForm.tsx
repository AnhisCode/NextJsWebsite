import { useForm } from "react-hook-form";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";

const ArticleInputForm = () => {
  const { data: session } = useSession();
  const { register, handleSubmit, reset } = useForm();
  const router = useRouter()

  // make the client fetch the current path which will in turn make them re render
  const refreshData = () => {
    router.replace(router.asPath)
  }

  // handles submit
  const onSubmit = async (data) => {
    const post = {
      title: data.title,
      body: data.body,
      // user: {
      //   email: session?.user?.email,
      //   name: session?.user?.name,
      // }
    }
    reset();
    try{
      fetch('http://localhost:3000/api/create', {
        body: JSON.stringify(post),
        headers: {
          'Content-type' : 'application/json'
        },
        method: 'POST'
      }).then((res) => {
        console.log(res)
        refreshData();
      })
    } catch(error) {
      console.log(error)
      
    }
  };

  return (
    <div className="flex justify-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col justify-center w-[600px]"
      >
        <h1 className="text-center text-white text-2xl w-[100%] mt-8">
          Publish an article
        </h1>
        <input
          {...register("title")}
          className="w-[100%] block bg-black border mb-2 rounded border-sky-500 shadow-md shadow-sky-500/50"
          placeholder="Title"
        />
        <textarea
          {...register("body")}
          className="w-[100%] h-32 block bg-black border mb-2 rounded border-sky-500 shadow-md shadow-sky-500/50"
          placeholder="Body"
        />
        <input
          type="submit"
          className="block bg-black border my-2 w-[30%] rounded border-sky-500 shadow-md shadow-sky-500/50
        hover:bg-white hover:text-black cursor-pointer"
        />
      </form>
    </div>
  );
};

export default ArticleInputForm;
