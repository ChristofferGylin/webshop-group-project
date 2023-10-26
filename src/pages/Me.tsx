import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

const MePage = () => {
  const router = useRouter();
  const { data: session } = useSession();

  useEffect(() => {
    if (!session) {
      router.push("/");
    }
  }, [session]);

  return (
    {session && <div className="mePageContainer">
      <h1>Me Page</h1>
    </div>}
  );
};


export default MePage;
