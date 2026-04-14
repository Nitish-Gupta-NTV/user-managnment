type Props = {
  label: string;
  name: string;
  register: any;
  error?: any;
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
      <input
        {...register(name)}
        type={type}
        placeholder={label}
        className="w-full p-3 border rounded-lg"
      />
      {error && <p className="text-red-500 text-sm">{error.message}</p>}
    </div>
  );
}