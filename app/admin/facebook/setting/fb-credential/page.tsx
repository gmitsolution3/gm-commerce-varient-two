import React from "react";
import FacebookPixelForm from "../../components/facebookPixelForm";
import { getFacebookPixelCredential } from "@/lib/facebook";

const FacebookCredential = async() => {

  const result = await getFacebookPixelCredential();



  if(!result.success){
    return <div className="min-w-full mx-auto">Failed to load Facebook credentials.</div>
  }

  return (
    <div className="min-w-full mx-auto">
      <FacebookPixelForm />
    </div>
  );
};

export default FacebookCredential;
