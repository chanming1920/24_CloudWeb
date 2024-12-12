import React, { createContext, useState } from "react";

export const SelectedNumberContext = createContext();

export const SelectedNumberProvider = ({ children }) => {
    const [selectedNumber, setSelectedNumber] = useState(null); // 전역 상태

    return (
        <SelectedNumberContext.Provider value={{ selectedNumber, setSelectedNumber }}>
            {children}
        </SelectedNumberContext.Provider>
    );
};