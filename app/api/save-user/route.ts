import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const filePath = path.join(process.cwd(), "data", "users.json");
    console.log("Saving to:", filePath);

    // Create folder if not exists
    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    let users = [];

    // Read existing file
    if (fs.existsSync(filePath)) {
      const fileData = fs.readFileSync(filePath, "utf-8");
      users = JSON.parse(fileData);
    }

    // Add classification + date
    const newUser = {
      ...body,
      createdAt: new Date().toISOString(),
      category: {
        roleType: body.role === "admin" ? "ADMIN" : "NORMAL_USER",
        skillCategory:
          body.skills.includes("java") || body.skills.includes("spring")
            ? "BACKEND"
            : body.skills.includes("react") || body.skills.includes("js")
            ? "FRONTEND"
            : "OTHER",
      },
    };

    users.push(newUser);

    fs.writeFileSync(filePath, JSON.stringify(users, null, 2));
    console.log("Saving to:", filePath);

    return NextResponse.json({ message: "User saved successfully ✅" });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to save user ❌" },
      { status: 500 }
    );
  }
}