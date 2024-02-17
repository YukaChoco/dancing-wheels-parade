import {Outlet} from "react-router-dom";
import {ImCross} from "react-icons/im";

export function Layout(): JSX.Element {
  return (
    <div>
      <header>
        <ImCross />
      </header>
      <main >
        <div>
          <Outlet />
        </div>
      </main>
    </div>
  );
}
