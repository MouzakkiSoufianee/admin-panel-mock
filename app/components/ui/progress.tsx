import * as React from "react"

type ProgressVariant = "default" | "gradient"

export interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number
  variant?: ProgressVariant
}

const variantStyles: Record<ProgressVariant, { bar: string; style?: React.CSSProperties }> = {
  default: {
    bar: "bg-primary",
  },
  gradient: {
    bar: "",
    style: {
      background: "linear-gradient(90deg, #3255FF 0%, #FF97E2 100%)",
    },
  },
}

export const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
  ({ value, className = "", variant = "default", ...props }, ref) => {
    const variantStyle = variantStyles[variant]
    
    return (
      <div className={`w-full bg-gray-200 rounded-full overflow-hidden h-2 ${className}`} ref={ref} {...props}>
        <div
          className={`${variantStyle.bar} h-full transition-all duration-300`}
          style={{ width: `${value}%`, ...variantStyle.style }}
        />
      </div>
    )
  }
)
Progress.displayName = "Progress"
