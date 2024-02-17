export function LoadingModal({ isOpen }: { isOpen: boolean }): JSX.Element {

  return (
    <div
      aria-modal={isOpen}
      aria-label="loading modal"
      className={`h-screen w-screen fixed top-0 left-0 flex items-center justify-center bg-light/60 z-10 ${isOpen ? "" : "hidden"}`}
    >
      <div className="w-fit h-fit">Loading...</div>
    </div>
  );
}