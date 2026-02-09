import * as React from "react";

type CardProps = React.HTMLAttributes<HTMLDivElement>;

export function Card({ className = "", ...props }: CardProps) {
  return (
    <div className={`bg-white  shadow-card p-6 ${className}`} {...props} />
  );
}

export function CardHeader({ className = "", ...props }: CardProps) {
  return (
    <div className={`mb-4 ${className}`} {...props} />
  );
}

export function CardTitle({ className = "", ...props }: CardProps) {
  return (
    <div className={`text-2xl font-semibold ${className}`} {...props} />
  );
}

export function CardContent({ className = "", ...props }: CardProps) {
  // Only add space-y-4 if no className is provided (for backward compatibility)
  const contentClass = className ? className : "space-y-4";
  return (
    <div className={contentClass} {...props} />
  );
}
