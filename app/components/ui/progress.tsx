import * as React from "react"

export interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number
}

export const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
  ({ value, className = "", ...props }, ref) => {
    return (
      <div className={`w-full bg-gray-200 rounded-full overflow-hidden ${className}`} ref={ref} {...props}>
        <div
          className="bg-primary h-full transition-all duration-300"
          style={{ width: `${value}%` }}
        />
      </div>
    )
  }
)
Progress.displayName = "Progress"
