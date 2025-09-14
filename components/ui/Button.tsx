import * as React from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline";
}

export function Button({ className, variant = "default", ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        "px-4 py-2 rounded-xl font-medium transition",
        variant === "default" &&
          "bg-blue-600 text-white hover:bg-blue-700 shadow-md",
        variant === "outline" &&
          "border border-gray-300 bg-white text-gray-700 hover:bg-gray-100",
        className
      )}
      {...props}
    />
  );
}
