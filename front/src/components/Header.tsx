export function Header(): JSX.Element {
  return (
    <header className="fixed top w-screen bg-dark py-2 px-6 text-light font-bold flex justify-between items-center">
      <div className="text-5xl align-self-start font-consolas text-shadow">
        <span>TAXMAN</span>
      </div>
      <div className="text-center" style={{ fontSize: '1.2rem' }}> {/* 直接スタイルを適用してフォントサイズを大きくしている */}
        <span>学生のための税金FAQサイト</span>
      </div>
    </header>
  );
}
