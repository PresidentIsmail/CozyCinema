"use client";

import { AiOutlineReload } from "react-icons/ai";
import { Button } from "@/components/ui/button";
import NoInternetDisplay from "@/components/NoInternetDisplay";
import Navbar from "@/components/application-group/navbar/Navbar";
import BottomMobileNavbar from "@/components/application-group/navbar/BottomMobileNavbar";
import { PiHouse } from "react-icons/pi";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  console.log(error.message);
  return (
    <main className="master-container mx-auto flex h-screen flex-col items-center justify-center gap-y-6 text-white">
      <Navbar />

      {/* <Image src={logo} alt="Logo" width={200} className="mb-10" /> */}

      <NoInternetDisplay />
      <div className="flex flex-col items-center gap-y-2">
        <h1 className="text-center text-3xl font-bold md:text-4xl lg:text-5xl">
          Something Went Wrong
        </h1>

        {/* display error message */}
        <p className="font-text-body  text-center text-[#e50914] lg:max-w-[36rem]">
          {error.message}
        </p>
      </div>

      {/* return home and back btns */}
      <div className="flex gap-x-4">
        {/* refresh screen btn */}
        <Button
          onClick={() => {
            reset();
          }}
          className="flex h-fit w-max items-center rounded-lg border-[#002be7ff] bg-primaryRed px-4 py-2 text-sm font-bold uppercase text-white outline outline-0 outline-[#454545] hover:bg-primaryRed/80 hover:text-white hover:outline-2 lg:text-base"
          aria-label="Retry"
        >
          <AiOutlineReload className="mr-2 h-4 w-4 lg:h-5 lg:w-5" /> Retry
        </Button>
      </div>

      <BottomMobileNavbar />
    </main>
  );
}
