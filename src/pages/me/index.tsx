import { getServerAuthSession } from "~/server/auth";
import { type GetServerSideProps } from "next";
const Me = () => {
  return <div className="mePageContainer">You are logged in</div>;
};
export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getServerAuthSession(ctx);

  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
};

export default Me;
