import { useForm } from "react-hook-form";
import { signOut, useSession } from "next-auth/react";

const InputForm = () => {
  const { data: session } = useSession();
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => {
    const post = {
      comment: data.comment,
      name: session?.user?.name,
      email: session?.user?.email,
    }
    console.log(post)
  };

  return (
    <div className="flex justify-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col justify-center"
      >
        <h1 className="text-center text-white text-2xl w-[100%] mt-8">
          Place your comment here!
        </h1>
        <textarea
          {...register("comment")}
          className="w-[100%] h-32 block bg-black border mb-2 rounded border-sky-500 shadow-lg shadow-sky-500/50"
        />
        <input
          type="submit"
          className="block bg-black border my-2 w-[100%] rounded border-sky-500 shadow-lg shadow-sky-500/50
        hover:bg-white hover:text-black cursor-pointer"
        />
      </form>
    </div>
  );
};

export default InputForm;
