import * as React from "react"

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "destructive" | "outline" | "link" | "ghost" | "gradient" | "black" | "lightgreen" | "purple_link"
  size?: "default" | "sm" | "xl" | "icon"
  asChild?: boolean
}

const variantClasses: Record<string, string> = {
  primary: "bg-primary text-white border-primary hover:bg-primary/90 shadow-md hover:shadow-lg border",
  secondary: "bg-light-gray text-foreground hover:bg-gray-200",
  destructive: "bg-red text-white border-red hover:bg-red-600 shadow-md hover:shadow-lg border",
  outline: "bg-white text-primary border-primary hover:bg-primary hover:text-white hover:shadow-lg border",
  link: "bg-white text-primary hover:underline-offset-4 hover:underline",
  ghost: "text-foreground hover:bg-light-gray",
  gradient: "bg-gradient-primary-to-secondary text-white shadow-md shadow-lg",
  black: "bg-black text-white hover:bg-gray-900 shadow-md hover:shadow-lg",
  lightgreen: "bg-[#8BC194] text-white hover:bg-green-600 shadow-md hover:shadow-lg",
  purple_link: "bg-white text-[#181945] hover:underline-offset-4 hover:underline",
}

const sizeClasses: Record<string, string> = {
  default: "h-8 px-3.5 rounded-xl",
  sm: "h-6 rounded-md px-3 text-sm rounded-xl",
  xl: "h-11 rounded-xl px-4 text-lg rounded-2xl",
  icon: "size-9 p-2 rounded-xl",
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = "", variant = "primary", size = "default", asChild = false, ...props }, ref) => {
    const Comp: any = asChild ? "span" : "button"
    return (
      <Comp
        className={`inline-flex cursor-pointer items-center justify-center border border-transparent gap-2 whitespace-nowrap font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-primary/50 disabled:pointer-events-none disabled:opacity-40 ${variantClasses[variant] || ""} ${sizeClasses[size] || ""} ${className}`}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"
