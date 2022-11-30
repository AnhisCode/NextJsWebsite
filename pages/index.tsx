import { Session } from "next-auth";
import { signOut, useSession } from "next-auth/react";
import GoogleLogin from "../components/GoogleLogin";
import Articles from "../components/Articles";
import InputForm from "../components/ArticleInputForm";
import { prisma } from "../lib/prisma";


// inside home read things inside props
const Home = ({articles}) => {

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
      <Articles articles={articles}/>
    </div>
    )
  }
};

export default Home;

// // this gets called at every build time
// export const getStaticProps = async () => {
//   const data = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=3')
//   const jsonData = await data.json()

//   console.log(jsonData)

//   // returns jsonData to this file
//   return {
//     props: {
//       jsonData
//     }
//   };
// }

export const getServerSideProps = async () => {
  const articles = await prisma.article.findMany({
    select: {
      title: true,
      artid: true,
      body: true,
    }
  })

  return {
    props: {
      articles
    }
  }
}
