"use client";

import React from "react";
import * as LucideIcons from "lucide-react";
import { LucideProps } from "lucide-react";

interface IconComponentProps {
  name: string;
  className?: string;
  size?: number | string;
  color?: string;
}

export function IconComponent({
  name,
  className,
  ...props
}: IconComponentProps) {
  const Icon = LucideIcons[
    name as keyof typeof LucideIcons
  ] as React.ComponentType<LucideProps>;

  if (!Icon) {
    return <LucideIcons.HelpCircle className={className} {...props} />;
  }

  return <Icon className={className} {...props} />;
}
