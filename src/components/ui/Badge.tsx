
export const Badge = ({ children, className, variant = "default" }: any) => {
  const baseClass = "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium";
  
  const variantClasses = {
    default: "bg-blue-100 text-blue-800",
    secondary: "bg-gray-100 text-gray-800",
    destructive: "bg-red-100 text-red-800",
    outline: "border border-gray-200 text-gray-700"
  };
  
  return (
    <span className={`${baseClass} ${variantClasses[variant] || ''} ${className}`}>
      {children}
    </span>
  );
};
