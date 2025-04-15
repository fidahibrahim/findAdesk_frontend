import { createContext, useContext, useState } from "react";


const TabsContext = createContext({
    value: "",
    onValueChange: (_: string) => {},
});

export const Tabs = ({ value, onValueChange, defaultValue, className, children }: any) => {
    const [tabValue, setTabValue] = useState(value || defaultValue || "");

    const handleValueChange = (newValue: any) => {
        if (onValueChange) {
            onValueChange(newValue);
        } else {
            setTabValue(newValue);
        }
    };

    return (
        <TabsContext.Provider
            value={{
                value: value !== undefined ? value : tabValue,
                onValueChange: handleValueChange
            }}
        >
            <div className={className}>
                {children}
            </div>
        </TabsContext.Provider>
    );
};

export const TabsList = ({ className, children }:any) => {
    return (
        <div className={`flex border-b border-gray-200 ${className}`}>
            {children}
        </div>
    );
};

export const TabsTrigger = ({ value, className, children }: any) => {
    const { value: selectedValue, onValueChange } = useContext(TabsContext);
    const isActive = selectedValue === value;

    return (
        <button
            className={`px-4 py-2 text-sm font-medium transition-colors
        ${isActive
                    ? "border-b-2 border-blue-500 text-blue-600"
                    : "text-gray-500 hover:text-gray-700"}
        ${className}`}
            onClick={() => onValueChange(value)}
            type="button"
            role="tab"
            aria-selected={isActive}
            data-state={isActive ? "active" : "inactive"}
        >
            {children}
        </button>
    );
};

export const TabsContent = ({ value, className, children }: any) => {
    const { value: selectedValue } = useContext(TabsContext);
    const isActive = selectedValue === value;

    if (!isActive) return null;

    return (
        <div
            className={className}
            role="tabpanel"
            data-state={isActive ? "active" : "inactive"}
        >
            {children}
        </div>
    );
};