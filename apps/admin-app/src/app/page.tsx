import Image from "next/image";
import {Button} from "@repo/ui"
import {Card} from "@repo/common/card"
import { CustomForm } from "@repo/ui";
import { useSession } from "next-auth/react";
import Navbar from "./components/Navbar";

export default function Home() {
  return (
    <div className="bg-white w-[100%] h-[100vh]">
      <Navbar />
    </div>
  );
}
