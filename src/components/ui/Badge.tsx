type BadgeVariant = "default" | "secondary" | "destructive" | "outline";

interface BadgeProps {
  children: React.ReactNode;
  className?: string;
  variant?: BadgeVariant;
}

export const Badge = ({ children, className = "", variant = "default" }: BadgeProps) => {
  const baseClass =
    "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium";

  const variantClasses: Record<BadgeVariant, string> = {
    default: "bg-blue-100 text-blue-800",
    secondary: "bg-gray-100 text-gray-800",
    destructive: "bg-red-100 text-red-800",
    outline: "border border-gray-200 text-gray-700",
  };

  return (
    <span className={`${baseClass} ${variantClasses[variant]} ${className}`}>
      {children}
    </span>
  );
};
