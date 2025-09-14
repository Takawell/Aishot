"use client";

import { devicePresets } from "@/lib/devices";

export default function DevicePresets() {
  return (
    <div className="grid grid-cols-2 gap-2">
      {devicePresets.map((d) => (
        <div key={d.name} className="p-2 border rounded-lg text-sm">
          {d.name} <span className="text-gray-500">({d.width}x{d.height})</span>
        </div>
      ))}
    </div>
  );
}
