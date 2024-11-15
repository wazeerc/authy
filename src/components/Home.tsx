import { useState } from "react";
import { useLogout } from "@/hooks/useAuth";
import { cn } from "@/lib/utils";
import { createPortal } from "react-dom";
import { Loader } from "./Loader";

const features = [
  {
    icon: "🔒",
    title: "Secure Authentication",
    description: "Enterprise-grade security for your applications",
  },
  {
    icon: "⚡",
    title: "Fast & Reliable",
    description: "Lightning-fast authentication processes",
  },
  {
    icon: "🛠️",
    title: "Easy Integration",
    description: "Simple setup with your existing infrastructure",
  },
];

const Home = () => {
  const [isModalVisible, setIsModalVisible] = useState(true);
  const closeModal = () => setIsModalVisible(false);
  const { mutateAsync: logout, isPending } = useLogout();

  return (
    <>
      {isPending ? (
        <Loader />
      ) : (
        <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
          <div className="container mx-auto px-4 py-16">
            <div className="text-center">
              <h1 className="mb-6 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-6xl font-bold text-transparent">
                Welcome to Authy
              </h1>
              <p className="mb-8 text-xl text-gray-600">Your secure authentication solution</p>
              <button
                onClick={() => logout()}
                className="rounded-full bg-purple-600 px-8 py-3 text-white transition-all hover:bg-purple-700 hover:shadow-lg"
              >
                Logout
              </button>
            </div>
          </div>

          <div className="container mx-auto grid grid-cols-1 gap-8 px-4 py-16 md:grid-cols-3">
            {features.map((feature, index) => (
              <div
                key={index}
                className="transform rounded-xl bg-white p-6 shadow-md transition-all hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="mb-4 text-3xl text-purple-600">{feature.icon}</div>
                <h3 className="mb-2 text-xl font-semibold">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {createPortal(
        <div onClick={closeModal}>
          {isModalVisible && <SuccessModal closeModal={closeModal} />}
        </div>,
        document.body,
      )}
    </>
  );
};

type SuccessModalProps = { closeModal: () => void };
const SuccessModal = (props: SuccessModalProps) => {
  const { closeModal } = props;

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
      </div>
    </div>
  );
};

export default Home;
