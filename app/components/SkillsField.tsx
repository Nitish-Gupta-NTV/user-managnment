"use client";

import {
  UseFormRegister,
  FieldArrayWithId,
  UseFieldArrayAppend,
  UseFieldArrayRemove,
  FieldErrors,
} from "react-hook-form";
import { UserFormValues } from "../lib/validationSchema";

type Props = {
  fields: FieldArrayWithId<UserFormValues, "skills">[];
  append: UseFieldArrayAppend<UserFormValues, "skills">;
  remove: UseFieldArrayRemove;
  register: UseFormRegister<UserFormValues>;
  errors: FieldErrors<UserFormValues>;
};

export default function SkillsField({
  fields,
  append,
  remove,
  register,
  errors,
}: Props) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Skills
      </label>

      {fields.map((field, index) => (
        <div key={field.id} className="flex gap-2 mt-2">
          <input
           // {...register(`skills.${index}`)}
           {...register(`skills.${index}.value`)}
            placeholder={`Skill ${index + 1}`}
            className={`flex-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${
              errors.skills?.[index] ? "border-red-400" : "border-gray-300"
            }`}
          />
          {fields.length > 1 && (
            <button
              type="button"
              onClick={() => remove(index)}
              className="bg-red-500 hover:bg-red-600 text-white px-3 rounded-lg transition-colors"
            >
              ✕
            </button>
          )}
        </div>
      ))}

      {errors.skills && !Array.isArray(errors.skills) && (
        <p className="text-red-500 text-sm mt-1">{errors.skills.message}</p>
      )}

      {Array.isArray(errors.skills) &&
        errors.skills.map(
          (err, i) =>
            err && (
              <p key={i} className="text-red-500 text-sm mt-1">
                Skill {i + 1}: {err.message}
              </p>
            )
        )}

      <button
        type="button"
        onClick={() => append("")}
        className="mt-3 text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors"
      >
        + Add Skill
      </button>
    </div>
  );
}