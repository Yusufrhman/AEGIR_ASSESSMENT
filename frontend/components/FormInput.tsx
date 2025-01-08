"use client";
import { motion } from "framer-motion";
import { useState, FC } from "react";

type FormInputProps = {
  id: string;
  type?: string;
  placeholder?: string;
  isError?: boolean;
  errorMessage?: string;
};

const FormInput: FC<
  FormInputProps & React.InputHTMLAttributes<HTMLInputElement>
> = ({
  id,
  type = "text",
  placeholder,
  isError = false,
  errorMessage,
  ...props
}) => {
  const isPassword = type === "password";
  const [isHidden, setIsHidden] = useState(true);

  return (
    <motion.div
      className="w-full h-full"
      animate={isError ? { y: [0, -5, 5, -5, 5, 0] } : { y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="w-full h-fit relative text-left ">
        {isPassword && (
          <div
            className="absolute right-2 bottom-1/2 translate-y-1/2 z-20 cursor-pointer"
            onClick={() => setIsHidden(!isHidden)}
          >
            <i
              className={`text-slate-400 ${
                isHidden ? "fa fa-eye-slash" : "fa fa-eye"
              }`}
            ></i>
          </div>
        )}
        <input
          type={isPassword && !isHidden ? "text" : type}
          name={id}
          id={id}
          placeholder={placeholder}
          className={`block w-full px-3 py-2 rounded-lg bg-transparent border  focus:outline-none focus:border-custom-teal  ${
            isError ? "text-red-400 border-red-400" : "border-slate-300"
          } ${isPassword && " pr-7"}`}
          {...props}
        />
      </div>
      {isError && errorMessage && (
        <p
          className="text-xs text-red-400 text-left p-1"
          data-testid="error-message"
        >
          {errorMessage}
        </p>
      )}
    </motion.div>
  );
};

export default FormInput;
