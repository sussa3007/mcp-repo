import React, { useState, KeyboardEvent, useRef, useEffect } from "react";
import { X } from "lucide-react";
import { Input } from "./input";
import { cn } from "@/lib/utils";

interface TagInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  value: string[];
  onValueChange: (value: string[]) => void;
  error?: string;
}

export function TagInput({
  value,
  onValueChange,
  error,
  className,
  ...props
}: TagInputProps) {
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "," || e.key === "Enter") {
      e.preventDefault();
      const newTag = inputValue.trim();
      if (newTag && !value.includes(newTag)) {
        onValueChange([...value, newTag]);
        setInputValue("");
      }
    } else if (e.key === "Backspace" && !inputValue && value.length > 0) {
      onValueChange(value.slice(0, -1));
    }
  };

  const removeTag = (tagToRemove: string) => {
    onValueChange(value.filter((tag) => tag !== tagToRemove));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    if (newValue.includes(",")) {
      const newTag = newValue.replace(",", "").trim();
      if (newTag && !value.includes(newTag)) {
        onValueChange([...value, newTag]);
        setInputValue("");
      }
    } else {
      setInputValue(newValue);
    }
  };

  useEffect(() => {
    // 입력 필드에 포커스가 있을 때 스크롤을 입력 필드로 이동
    const handleFocus = () => {
      inputRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    inputRef.current?.addEventListener("focus", handleFocus);
    return () => {
      inputRef.current?.removeEventListener("focus", handleFocus);
    };
  }, []);

  return (
    <div className="w-full">
      <div
        className={cn(
          "flex flex-wrap gap-2 p-2 rounded-md border bg-zinc-700 border-zinc-600 min-h-[40px]",
          className
        )}
        onClick={() => inputRef.current?.focus()}
      >
        {value.map((tag) => (
          <span
            key={tag}
            className="flex items-center gap-1 px-2 py-1 bg-purple/20 text-purple-light rounded-md text-sm"
          >
            {tag}
            <button
              type="button"
              onClick={() => removeTag(tag)}
              className="text-purple-light hover:text-purple-dark focus:outline-none"
            >
              <X size={14} />
            </button>
          </span>
        ))}
        <Input
          ref={inputRef}
          value={inputValue}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          className="flex-1 !m-0 !p-0 !border-0 !bg-transparent min-w-[120px] focus-visible:ring-0"
          placeholder={value.length === 0 ? props.placeholder : ""}
          {...props}
        />
      </div>
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
}
