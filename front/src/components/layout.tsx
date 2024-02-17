import { Outlet } from "react-router-dom";
import { Header } from "./Header";
import mono from "@/assets/mono.svg";

export function Layout(): JSX.Element {
  return (
    <div>
      <Header />
      <main className="bg-light h-screen pt-20 px-4" >
        <div>
          <Outlet />
        </div>
        <img src={mono} alt="背景" className="w-fit opacity-5 fixed bottom-0 right-0 p-6 w-3/4 sm:w-fit sm:h-1/2" />
      </main>
    </div>
  );
}
