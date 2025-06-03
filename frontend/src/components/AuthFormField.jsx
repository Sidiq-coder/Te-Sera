import { useState } from "react";

const AuthFormField = ({ label, type, id, placeholder, value, onChange }) => {
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = type === "password";
  const inputType = isPassword && showPassword ? "text" : type;

  return (
    <div className="relative">
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        type={inputType}
        id={id}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 pr-10"
      />
      {isPassword && (
        <button
          type="button"
          onClick={() => setShowPassword((prev) => !prev)}
          className="absolute right-3 bottom-2.5 text-sm text-gray-500"
        >
          {showPassword ? "Hide" : "Show"}
        </button>
      )}
    </div>
  );
};

export default AuthFormField;
