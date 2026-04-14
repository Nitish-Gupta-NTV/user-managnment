"use client";

import { useSearchParams } from "next/navigation";

type User = {
  name: string;
  email: string;
  password: string;
  role: string;
  skills: string[];
};


export default function PreviewPage() {
  const searchParams = useSearchParams();
  const data = searchParams.get("data");

  let user: User | null = null;

  try {
    if (data) {
      user = JSON.parse(decodeURIComponent(data));
    }
  } catch (error) {
    console.error("Invalid data format");
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-500">No valid user data found ❌</p>
      </div>
    );
  }
  const saveUser = async () => {
  const res = await fetch("/api/save-user", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });

  const data = await res.json();
  alert(data.message);
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md space-y-3">
        <h2 className="text-xl font-bold text-center text-blue-600">
          User Preview
        </h2>

        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Role:</strong> {user.role}</p>

        <div>
          <strong>Skills:</strong>
          <ul className="list-disc ml-5 mt-1">
            {user.skills.map((skill, index) => (
              <li key={index}>{skill}</li>
            ))}
          </ul>
        </div>

       <button 
 disabled
  className="w-full mt-2 bg-green-500 text-white py-2 rounded-lg"
>
  Save Users
</button>
      </div>
    </div>
  );
}
/*
<button 
  onClick={saveUser}
  className="w-full mt-2 bg-green-500 text-white py-2 rounded-lg"
>
  Save User
</button>
 */