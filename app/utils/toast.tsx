import { toast } from "sonner"

interface ToastOptions {
  position?: "top-left" | "top-right" | "bottom-left" | "bottom-right" | "top-center" | "bottom-center"
  duration?: number
}

/**
 * Standardized toast utilities with consistent styling
 * Use these instead of calling toast.* directly to ensure consistent UX
 */
export const showToast = {
  /**
   * Success toast for 200 responses and successful operations
   * Green color with check icon
   */
  success: (message: string, options?: ToastOptions) => {
    return toast.success(message, {
      position: options?.position || "top-right",
      duration: options?.duration || 3000,
      style: {
        background: "#D8FAE9 !important", // Green-400 (lighter) - force override
        color: "#43A047 !important",
        border: "1px solid #4CAF50 !important",
      },
      className: "toast-success",
    })
  },

  /**
   * Error toast for user-critical errors only
   * Red color with X icon
   * Only show when user MUST see the error (not for all API failures)
   */
  error: (message: string, options?: ToastOptions) => {
    return toast.error(message, {
      position: options?.position || "top-right",
      duration: options?.duration || 5000,
      style: {
        background: "#E9DCDD !important", // Red-400 (lighter) - force override
        color: "#D20405 !important",
        border: "1px solid #f96767 !important", // Red-500
      },
      className: "toast-error",
    })
  },

  /**
   * Warning toast for important but non-critical information
   * Orange/amber color with alert icon
   */
  warning: (message: string, options?: ToastOptions) => {
    return toast.warning(message, {
      position: options?.position || "top-right",
      duration: options?.duration || 1000000,
      style: {
        background: "#FBBF24 !important", // Amber-400 (lighter) - force override
        color: "white !important",
        border: "1px solid #F59E0B !important", // Amber-500
      },
      className: "toast-warning",
    })
  },

  /**
   * Info toast for general information
   * Blue color with info icon
   */
  info: (message: string, options?: ToastOptions) => {
    return toast.info(message, {
      position: options?.position || "top-right",
      duration: options?.duration || 1000000,
      style: {
        background: "#60A5FA !important", // Blue-400 (lighter) - force override
        color: "white !important",
        border: "1px solid #3B82F6 !important", // Blue-500
      },
      className: "toast-info",
    })
  },

  /**
   * Loading toast for operations in progress
   */
  loading: (message: string, options?: ToastOptions) => {
    return toast.loading(message, {
      position: options?.position || "top-right",
      style: {
        background: "#9CA3AF !important", // Gray-400 (lighter) - force override
        color: "white !important",
        border: "1px solid #6B7280 !important", // Gray-500
      },
      className: "toast-loading",
    })
  },

  /**
   * Dismiss a specific toast
   */
  dismiss: (id: string | number) => {
    return toast.dismiss(id)
  },
}

/**
 * Guidelines for when to show toasts:
 *
 * SUCCESS (Green):
 * - Use for all successful operations (200 responses)
 * - Form submissions, file uploads, settings changes
 * - User actions that complete successfully
 *
 * ERROR (Red):
 * - ONLY for errors the user MUST see and can act on
 * - Form validation errors, critical failures
 * - NOT for background API failures or network issues
 * - NOT for expected/recoverable errors
 *
 * WARNING (Orange):
 * - Important information that's not an error
 * - Permissions issues, missing data warnings
 * - Actions that partially succeeded
 *
 * INFO (Blue):
 * - General information messages
 * - Status updates, helpful tips
 */
