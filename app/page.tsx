"use client";

import { useState } from "react";
import ScreenshotForm from "@/components/screenshot/ScreenshotForm";
import ScreenshotResult from "@/components/screenshot/ScreenshotResult";

export default function HomePage() {
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const handleSubmit = async (data: { url: string; width: number; height: number }) => {
    setImageUrl(null);

    try {
      const res = await fetch("/api/screenshot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Failed to take screenshot");

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      setImageUrl(url);
    } catch (err) {
      console.error(err);
      alert("Screenshot failed. Please try again.");
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div>
        <h2 className="text-2xl font-bold mb-4">Take a Screenshot</h2>
        <ScreenshotForm onSubmit={handleSubmit} />
      </div>

      <div>
        <ScreenshotResult imageUrl={imageUrl} />
      </div>
    </div>
  );
}
