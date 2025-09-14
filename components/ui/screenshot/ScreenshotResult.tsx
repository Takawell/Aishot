"use client";

import { Button } from "@/components/ui/Button";

interface Props {
  imageUrl: string | null;
}

export default function ScreenshotResult({ imageUrl }: Props) {
  if (!imageUrl) return null;

  return (
    <div className="p-4 bg-white shadow rounded-xl space-y-4">
      <h2 className="text-lg font-semibold">Result</h2>
      <img
        src={imageUrl}
        alt="Screenshot"
        className="rounded-lg border shadow max-w-full"
      />
      <Button asChild>
        <a href={imageUrl} download="screenshot.png">
          Download
        </a>
      </Button>
    </div>
  );
}
