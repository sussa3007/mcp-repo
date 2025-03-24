"use client";

import React from "react";
import Image from "next/image";
import exampleImage from "@/assets/images/example.jpg";
import { Image as ImageIcon, FileImage, Info, AlertCircle } from "lucide-react";

export default function ImageExample() {
  return (
    <div className="flex flex-col items-center gap-8 py-8">
      <h2 className="text-2xl font-bold">Image Import Example</h2>

      {/* Using imported image */}
      <div className="relative w-full max-w-md h-64 rounded-lg overflow-hidden">
        <Image
          src={exampleImage}
          alt="Example image"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Icon examples */}
      <div className="flex flex-col gap-4 w-full max-w-md">
        <h3 className="text-xl font-medium">Icon Usage Examples:</h3>
        <div className="space-y-4">
          <div className="flex items-center gap-3 p-3 bg-zinc-100 dark:bg-zinc-800 rounded-md">
            <ImageIcon className="w-5 h-5 text-blue-500" />
            <span>Image icon</span>
          </div>
          <div className="flex items-center gap-3 p-3 bg-zinc-100 dark:bg-zinc-800 rounded-md">
            <FileImage className="w-5 h-5 text-green-500" />
            <span>File image icon</span>
          </div>
          <div className="flex items-center gap-3 p-3 bg-zinc-100 dark:bg-zinc-800 rounded-md">
            <Info className="w-5 h-5 text-amber-500" />
            <span>Info icon</span>
          </div>
          <div className="flex items-center gap-3 p-3 bg-zinc-100 dark:bg-zinc-800 rounded-md">
            <AlertCircle className="w-5 h-5 text-red-500" />
            <span>Alert icon</span>
          </div>
        </div>
      </div>

      {/* Public directory image usage examples */}
      <div className="flex flex-col gap-4 w-full max-w-md">
        <h3 className="text-xl font-medium">How to Use Images:</h3>
        <div className="bg-zinc-100 dark:bg-zinc-800 p-4 rounded-md">
          <p className="text-sm font-mono whitespace-pre-wrap">
            {`// Import from assets directory
import myImage from '@/assets/images/image-filename.jpg';

// Use in component
<Image 
  src={myImage}
  alt="Image description"
  width={800}
  height={600}
  className="rounded-lg"
/>`}
          </p>
        </div>
      </div>

      {/* Icon usage */}
      <div className="flex flex-col gap-4 w-full max-w-md">
        <h3 className="text-xl font-medium">How to Use Icons:</h3>
        <div className="bg-zinc-100 dark:bg-zinc-800 p-4 rounded-md">
          <p className="text-sm font-mono whitespace-pre-wrap">
            {`// Import Lucide React icons
import { ImageIcon, FileImage } from 'lucide-react';

// Use in component
<div className="flex items-center gap-2">
  <ImageIcon className="w-5 h-5 text-blue-500" />
  <span>Use with text</span>
</div>`}
          </p>
        </div>
      </div>
    </div>
  );
}
