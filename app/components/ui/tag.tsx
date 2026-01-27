import * as React from "react"

export interface TagProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?:
    | "in-progress"
    | "completed"
    | "upcoming"
    | "pending"
    | "filled-purple"
    | "success"
    | "warning"
    | "error"
    | "info"
  size?: "default" | "sm" | "lg"
  showDot?: boolean
}

const variantClasses: Record<string, string> = {
  "in-progress": "bg-blue-100 text-blue-800",
  completed: "bg-green-100 text-green-800",
  upcoming: "bg-yellow-100 text-yellow-800",
  pending: "bg-gray-100 text-gray-800",
  "filled-purple": "bg-purple text-white",
  success: "bg-green-100 text-green-800",
  warning: "bg-yellow-100 text-yellow-800",
  error: "bg-red-100 text-red-800",
  info: "bg-blue-100 text-blue-800",
}

const sizeClasses: Record<string, string> = {
  default: "px-3 py-1 text-sm rounded-xl",
  sm: "px-2 py-0.5 text-xs rounded-lg",
  lg: "px-4 py-2 text-base rounded-2xl",
}

export const Tag = React.forwardRef<HTMLSpanElement, TagProps>(
  ({ className = "", variant = "in-progress", size = "default", showDot = false, children, ...props }, ref) => {
    return (
      <span
        className={`inline-flex items-center font-medium ${variantClasses[variant] || ""} ${sizeClasses[size] || ""} ${className}`}
        ref={ref}
        {...props}
      >
        {showDot && <span className="w-2 h-2 rounded-full bg-current mr-2" />}
        {children}
      </span>
    )
  }
)
Tag.displayName = "Tag"
