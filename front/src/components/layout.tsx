import {Outlet} from "react-router-dom";
import {Header} from "./Header";

export function Layout(): JSX.Element {
  return (
    <div>
      <Header />
      <main >
        <div>
          <Outlet />
        </div>
      </main>
    </div>
  );
}
