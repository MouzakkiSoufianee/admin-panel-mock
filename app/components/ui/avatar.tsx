import * as React from "react"

export interface AvatarProps extends React.HTMLAttributes<HTMLSpanElement> {}

export const Avatar = React.forwardRef<HTMLSpanElement, AvatarProps>(
  ({ className = "", ...props }, ref) => (
    <span
      className={`inline-flex items-center justify-center w-12 h-12 rounded-full bg-gray-200 overflow-hidden ${className}`}
      ref={ref}
      {...props}
    />
  )
)
Avatar.displayName = "Avatar"

export interface AvatarImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {}

export const AvatarImage = React.forwardRef<HTMLImageElement, AvatarImageProps>(
  ({ className = "", ...props }, ref) => (
    <img
      className={`object-cover w-full h-full ${className}`}
      ref={ref}
      {...props}
    />
  )
)
AvatarImage.displayName = "AvatarImage"

export interface AvatarFallbackProps extends React.HTMLAttributes<HTMLSpanElement> {}

export const AvatarFallback = React.forwardRef<HTMLSpanElement, AvatarFallbackProps>(
  ({ className = "", children, ...props }, ref) => (
    <span
      className={`flex items-center justify-center w-full h-full text-lg font-semibold text-gray-600 ${className}`}
      ref={ref}
      {...props}
    >
      {children}
    </span>
  )
)
AvatarFallback.displayName = "AvatarFallback"
