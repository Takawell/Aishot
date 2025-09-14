"use client";

import { useState } from "react";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";
import { devicePresets } from "@/lib/devices";

interface Props {
  onSubmit: (data: { url: string; width: number; height: number }) => void;
}

export default function ScreenshotForm({ onSubmit }: Props) {
  const [url, setUrl] = useState("");
  const [preset, setPreset] = useState("");
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const device = devicePresets.find((d) => d.name === preset);
    onSubmit({
      url,
      width: device ? device.width : parseInt(width) || 1280,
      height: device ? device.height : parseInt(height) || 720,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 bg-white shadow rounded-xl">
      <div>
        <label className="block text-sm font-medium mb-1">Website URL</label>
        <Input
          type="url"
          placeholder="https://example.com"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Device Preset</label>
        <Select value={preset} onChange={(e) => setPreset(e.target.value)}>
          <option value="">Custom</option>
          {devicePresets.map((d) => (
            <option key={d.name} value={d.name}>
              {d.name} ({d.width}x{d.height})
            </option>
          ))}
        </Select>
      </div>

      {!preset && (
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="block text-sm font-medium mb-1">Width</label>
            <Input
              type="number"
              value={width}
              onChange={(e) => setWidth(e.target.value)}
              placeholder="1280"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Height</label>
            <Input
              type="number"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              placeholder="720"
            />
          </div>
        </div>
      )}

      <Button type="submit" className="w-full">
        Take Screenshot
      </Button>
    </form>
  );
}
