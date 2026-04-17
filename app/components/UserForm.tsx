"use client";

import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { userSchema, UserFormValues } from "../lib/validationSchema";
import InputField from "./InputField";
import SkillsField from "./SkillsField";
import { useEffect } from "react";

export default function UserForm() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<UserFormValues>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      role: "",
     // skills: [""],
      skills: [{ value: "" }], 
    },
  });

  /*const { fields, append, remove } = useFieldArray({
    control,
    name: "skills" as never,
  });*/
  const { fields, append, remove } = useFieldArray({
  control,
  name: "skills",            
});

 /* const onSubmit = (data: UserFormValues) => {
    localStorage.setItem("userData", JSON.stringify(data));
    router.push("/preview");
  };*/
  const onSubmit = (data: UserFormValues) => {
  const payload = {
    ...data,
    skills: data.skills.map((s) => s.value),  // ← back to string[]
  };
  localStorage.setItem("userData", JSON.stringify(payload));
  router.push("/preview");
};
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white rounded-2xl shadow-md w-full max-w-md p-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Create User
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <InputField
            label="Full Name"
            name="name"
            register={register}
            error={errors.name}
          />

          <InputField
            label="Email"
            name="email"
            type="email"
            register={register}
            error={errors.email}
          />

          <InputField
            label="Password"
            name="password"
            type="password"
            register={register}
            error={errors.password}
          />

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Role
            </label>
            <select
              {...register("role")}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            >
              <option value="">Select a role</option>
              <option value="admin">Admin</option>
              <option value="user">User</option>
              <option value="editor">Editor</option>
            </select>
            {errors.role && (
              <p className="text-red-500 text-sm mt-1">{errors.role.message}</p>
            )}
          </div>

          <SkillsField
            fields={fields}
            append={append}
            remove={remove}
            register={register}
            errors={errors}
          />

          <button
            type="submit"
            className="w-full mt-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors"
          >
            Preview →
          </button>
        </form>
      </div>
    </div>
  );
}