
export const ScrollArea = ({ className, children }: any) => {
  return (
    <div className={`overflow-auto ${className}`}>
      <div className="h-full w-full">
        {children}
      </div>
    </div>
  );
};