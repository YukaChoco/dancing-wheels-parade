import { Outlet } from "react-router-dom";
import { Header } from "./Header";

export function Layout(): JSX.Element {
  return (
    <div>
      <Header />
      <main className="bg-light h-screen pt-20 px-4" >
        <div>
          <Outlet />
        </div>
      </main>
    </div>
  );
}
