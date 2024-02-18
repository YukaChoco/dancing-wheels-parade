import color from "@/assets/color.svg";
import './LoadingModal.css';

export function LoadingModal({ isOpen }: { isOpen: boolean }): JSX.Element {

  return (
    <div
      aria-modal={isOpen}
      aria-label="loading modal"
      className={`h-screen w-screen fixed top-0 left-0 flex flex-col items-center justify-center bg-light/80 z-50 ${isOpen ? "" : "hidden"}`}
    >
      <div className="loader">
        <img width="100%" src={color} alt="ninzya_body" />
      </div>
      <span className="pt-12 h-fit font-bold text-3xl">Loading...</span>
    </div>
  );
}