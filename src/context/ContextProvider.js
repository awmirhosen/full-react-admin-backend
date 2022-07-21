import React,{ createContext, useContext, useState } from "react";

const StateContext = createContext();

export const ContextProvider = ({children}) => {
    //define states



    return (
     <StateContext.Provider value={{ }}>
         {children}
     </StateContext.Provider>

    )

}

export const useStateContext = () => useContext(StateContext)