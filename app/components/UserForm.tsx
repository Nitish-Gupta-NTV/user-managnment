"use client";

import { useRouter } from "next/navigation";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { userSchema } from "../lib/validationSchema";
import InputField from "./InputField";
import SkillsField from "./SkillsField";

export default function UserForm() {
  const router = useRouter();

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<any>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      skills: [""],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "skills",
  });

  const onSubmit = (data: any) => {
    router.push(`/preview?data=${encodeURIComponent(JSON.stringify(data))}`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-300">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-lg space-y-4"
      >
        <h2 className="text-2xl font-bold text-center text-blue-600">
          User Management
        </h2>

        <InputField label="Full Name" name="name" register={register} error={errors.name} />
        <InputField label="Email" name="email" register={register} error={errors.email} />
        <InputField label="Password" name="password" type="password" register={register} error={errors.password} />

        <select {...register("role")} className="w-full p-3 border rounded-lg">
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>

        <SkillsField
          fields={fields}
          append={append}
          remove={remove}
          register={register}
          errors={errors}
        />

        <button className="w-full bg-blue-500 text-white py-3 rounded-lg">
          Preview User
        </button>
      </form>
    </div>
  );
}