"use client";

import CreateTokenForm from "@/components/CreateTokenForm";

const CreateTokenPage = () => {
  return (
    <div className="bg-blacklight text-white flex justify-center items-center py-2">
      <div className="max-w-3xl mx-auto gap-4 p-4 w-full">
        <CreateTokenForm />
      </div>
    </div>
  );
};

export default CreateTokenPage;
