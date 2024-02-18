import { Link } from 'react-router-dom';
import './Header.css';

export function Header(): JSX.Element {
  return (
    <header className="fixed top-0 w-screen bg-dark py-2 px-6 text-light font-bold z-20">

       <Link to={'/'}> <span className="text-3xl font-consolas text-shadow pr-4 text-shadow">TAXMAN</span>
       </Link>
  
        <span  className="text-center text-lg hidden md:inline-block">学生のための税金FAQサイト</span>
      
    </header>
  );
}



