type Props = {
  fields: any[];
  append: (value: string) => void;
  remove: (index: number) => void;
  register: any;
  errors: any;
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
      <label className="font-semibold">Skills</label>

      {fields.map((field, index) => (
        <div key={field.id} className="flex gap-2 mt-2">
          <input
            {...register(`skills.${index}`)}
            className="flex-1 p-2 border rounded-lg"
          />
          <button
            type="button"
            onClick={() => remove(index)}
            className="bg-red-500 text-white px-3 rounded-lg"
          >
            ✕
          </button>
        </div>
      ))}

      {errors.skills && (
        <p className="text-red-500 text-sm">{errors.skills.message}</p>
      )}

      <button
        type="button"
        onClick={() => append("")}
        className="mt-2 text-blue-600"
      >
        + Add Skill
      </button>
    </div>
  );
}