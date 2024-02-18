export function Header(): JSX.Element {
  return (
    <header className="fixed top-0 w-screen bg-dark py-2 px-6 text-light font-bold flex justify-between items-center">
      <div className="text-3xl font-consolas text-shadow"> {/* 3xlサイズを使用 */}
        <span>TAXMAN</span>
      </div>
      <div className="text-center text-lg">
        <span>学生のための税金FAQサイト</span>
      </div>
    </header>
  );
}



