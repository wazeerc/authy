import { useState } from "react";

import { useLogout } from "@/hooks/useAuth";
import { cn } from "@/lib/utils";
import { createPortal } from "react-dom";

const Home = () => {
  const [isModalVisible, setIsModalVisible] = useState(true);

  return (
    <>
      <div>Welcome Home!</div>
      {createPortal(
        <>{isModalVisible && <SuccessModal closeModal={() => setIsModalVisible(false)} />}</>,
        document.body,
      )}
    </>
  );
};

type SuccessModalProps = { closeModal: () => void };
const SuccessModal = (props: SuccessModalProps) => {
  const { closeModal } = props;
  const { mutateAsync } = useLogout();
  const handleLogout = async () => {
    try {
      await mutateAsync();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={cn("fixed inset-0 flex items-center justify-center bg-black bg-opacity-50")}>
      <div
        className={cn(
          "flex flex-col rounded-md border-4 border-solid border-purple-200 bg-white px-12 py-8",
          "text-center shadow-lg",
        )}
      >
        <div className={cn("self-end")}>
          <button
            className={cn(
              "h-8 w-8 rounded-full text-purple-400",
              "hover:bg-neutral-100 hover:text-purple-600",
              "transition-colors duration-200 ease-in",
            )}
            onClick={() => closeModal()}
          >
            x
          </button>
        </div>
        <div className={cn("mb-4 text-5xl text-green-500")}>✓</div>
        <h1 className={cn("mb-4 text-2xl text-neutral-800")}>Login Successful!</h1>
        <p className={cn("mb-6 text-neutral-600")}>Welcome back!</p>
        <button
          onClick={handleLogout}
          className={cn(
            "rounded bg-purple-500 px-6 py-2 text-white transition-colors hover:bg-purple-600",
          )}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Home;
