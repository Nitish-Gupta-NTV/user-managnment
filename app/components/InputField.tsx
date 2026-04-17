"use client";

import { UseFormRegister, FieldError } from "react-hook-form";
import { UserFormValues } from "../lib/validationSchema";

type Props = {
  label: string;
  name: keyof UserFormValues;
  register: UseFormRegister<UserFormValues>;
  error?: FieldError;
  type?: string;
};

export default function InputField({
  label,
  name,
  register,
  error,
  type = "text",
}: Props) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <input
        {...register(name)}
        type={type}
        placeholder={label}
        className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${
          error ? "border-red-400" : "border-gray-300"
        }`}
      />
      {error && (
        <p className="text-red-500 text-sm mt-1">{error.message}</p>
      )}
    </div>
  );
}