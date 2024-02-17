import {Outlet} from "react-router-dom";
import progateLogo from "@/assets/progate_logo.svg";
import helpfeelLogo from "@/assets/helpfeel_logo.svg";
import {ImCross} from "react-icons/im";

export function Layout(): JSX.Element {
  return (
    <div>
      <header>
        <img src={progateLogo} alt="progate logo" />
        <ImCross />
        <img src={helpfeelLogo} alt="helpfeel logo" />
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
