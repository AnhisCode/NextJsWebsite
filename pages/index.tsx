import { Session } from "next-auth";
import { signOut, useSession } from "next-auth/react";
import GoogleLogin from "../components/GoogleLogin";
import Comments from "../components/Comments";
import InputForm from "../components/inputForm";

// inside home read things inside props
const Home = ({jsonData}) => {

  const { data: session } = useSession();

  // check if user is logged in
  let isLoggedIn: Session | null = session;

  if (!isLoggedIn){
  return (
    <div>
      <div className="flex justify-center pt-8">
        <GoogleLogin />
      </div>
    </div>
  );
  } else {
    return(
      <div>
      <div className="flex justify-center text-3xl font-bold underline text-white text-4xl pt-8 w-[100%]">
      Welcome back {session?.user?.name}!!
      <br />
      </div>
      <div className="flex justify-center pt-8">
        <GoogleLogin />
      </div>
        <InputForm/>
      <Comments jsonData={jsonData}/>
    </div>
    )
  }
};

export default Home;

// this gets called at every build time
export const getStaticProps = async () => {
  const data = await fetch('https://jsonplaceholder.typicode.com/comments?_limit=20')
  const jsonData = await data.json()

  // returns jsonData to this file
  return {
    props: {
      jsonData
    }
  };
}
