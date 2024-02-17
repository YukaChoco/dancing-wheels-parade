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
      <footer>
        <div>
          <span>&copy; 2014 Progate, Inc.</span>
        </div>
        <div>
          <span>Powered by Helpfeel</span>
        </div>
      </footer>
    </div>
  );
}
