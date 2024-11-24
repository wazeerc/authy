// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

import useAuth from "@/hooks/use-auth";
import { cn } from "@/lib/utils";

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

type HomeProps = { username: string };
const Home = (props: HomeProps) => {
  const username = props.username;

  const [isModalVisible, setIsModalVisible] = useState(true);
  const closeModal = () => setIsModalVisible(false);

  const { mutateAsync, isPending } = useAuth("logout");

  // Uncomment to test the protected route, verify Network tab in DevTools
  // useEffect(() => {
  //   fetch("http://localhost:5000/protected", {
  //     headers: {
  //       Authorization: `Bearer ${localStorage.getItem("token")}`,
  //     },
  //   });
  // }, []);

  return (
    <>
      {isPending ? (
        <Loader />
      ) : (
        <div
          className={cn(
            "min-h-96 rounded-md shadow-lg",
            "bg-gradient-to-b from-purple-50 to-white",
            "dark:from-gray-900 dark:to-gray-800 dark:shadow-purple-900/20",
          )}
        >
          <div className="container mx-auto px-4 py-16">
            <div className="text-center">
              <h1
                className={cn(
                  "mb-6 text-6xl font-bold",
                  "bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent",
                )}
              >
                Welcome to Authy, {username && username + "!"}
              </h1>
              <p
                className={cn(
                  "mb-8 text-xl",
                  "text-gray-600 dark:text-gray-300",
                )}
              >
                Your secure authentication solution
              </p>
              <button
                onClick={() => mutateAsync(undefined)}
                className={cn(
                  "rounded-full px-8 py-3",
                  "bg-purple-600 text-white",
                  "hover:bg-purple-700 hover:shadow-lg",
                  "dark:bg-purple-700 dark:hover:bg-purple-800",
                  "transition-all",
                )}
              >
                Logout
              </button>
            </div>
          </div>

          <div
            className={cn(
              "container mx-auto px-4 py-16",
              "grid grid-cols-1 gap-8 md:grid-cols-3",
            )}
          >
            {features.map((feature, index) => (
              <div
                key={index}
                className={cn(
                  "rounded-xl p-6",
                  "bg-white dark:bg-gray-800",
                  "shadow-md dark:shadow-purple-900/20",
                  "transform transition-all",
                  "hover:-translate-y-1 hover:shadow-xl",
                )}
              >
                <div
                  className={cn(
                    "mb-4 text-3xl",
                    "text-purple-600 dark:text-purple-400",
                  )}
                >
                  {feature.icon}
                </div>
                <h3
                  className={cn(
                    "mb-2 text-xl font-semibold",
                    "dark:text-white",
                  )}
                >
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {feature.description}
                </p>
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
    <div
      className={cn(
        "fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 backdrop-blur-lg",
      )}
    >
      <div
        className={cn(
          "flex flex-col rounded-md border-4 border-solid px-12 py-8",
          "text-center shadow-lg",
          "border-purple-200 bg-white dark:border-purple-700 dark:bg-gray-800",
        )}
      >
        <div className={cn("self-end")}>
          <button
            className={cn(
              "h-8 w-8 rounded-full",
              "text-purple-400 hover:bg-neutral-100 hover:text-purple-600",
              "dark:hover:bg-gray-700 dark:hover:text-purple-400",
              "transition-colors duration-200 ease-in",
            )}
            onClick={() => closeModal()}
          >
            x
          </button>
        </div>
        <div className={cn("mb-4 text-5xl text-green-500")}>✓</div>
        <h1 className={cn("mb-4 text-2xl text-neutral-800 dark:text-white")}>
          Login Successful!
        </h1>
        <p className={cn("mb-6 text-neutral-600 dark:text-gray-300")}>
          Welcome back!
        </p>
      </div>
    </div>
  );
};

export default Home;
