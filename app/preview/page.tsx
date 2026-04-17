"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type User = {
  name: string;
  email: string;
  password: string;
  role: string;
  skills: string[];
 
};

export default function PreviewPage() {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const data = localStorage.getItem("userData");
    if (data) {
      setUser(JSON.parse(data));
    } else {
      router.push("/");
    }
  }, [router]);

  const handleConfirm = () => {
    localStorage.removeItem("userData");
    alert("User saved successfully!");
    router.push("/");
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-50 px-4">
      <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
          Preview User
        </h2>

        <div className="space-y-3 mb-6">
          <div className="flex justify-between border-b border-gray-100 pb-2">
            <span className="text-sm font-medium text-gray-500">Name</span>
            <span className="text-sm text-gray-800">{user.name}</span>
          </div>
          <div className="flex justify-between border-b border-gray-100 pb-2">
            <span className="text-sm font-medium text-gray-500">Email</span>
            <span className="text-sm text-gray-800">{user.email}</span>
          </div>
          <div className="flex justify-between border-b border-gray-100 pb-2">
            <span className="text-sm font-medium text-gray-500">Role</span>
            <span className="text-sm text-gray-800 capitalize">{user.role}</span>
          </div>
          <div className="flex justify-between border-b border-gray-100 pb-2">
            <span className="text-sm font-medium text-gray-500">Skills</span>
            <span className="text-sm text-gray-800 text-right max-w-[60%]">
              {user.skills?.join(", ")}
            </span>
          </div>
        </div>

        <div className="space-y-2">
          <button
            onClick={() => router.push("/")}
            className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2.5 rounded-lg transition-colors"
          >
            Edit
          </button>

          <button
            onClick={handleConfirm}
            className="w-full py-2.5 rounded-lg text-white font-semibold bg-green-500 hover:bg-green-600 transition-colors"
          >
            Confirm & Submit
          </button>
        </div>
      </div>
    </div>
  );
}