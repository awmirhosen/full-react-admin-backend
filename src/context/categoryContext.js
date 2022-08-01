import { createContext, useState } from "react";

export const CategoryContext = createContext({
    editId: null,
    setEditId: ()=>{}
})

const CategoryContextContainer = ({children})=>{
    const [editId , setEditId] = useState(null)
    const [render , setRender] = useState(0)
    return (
        <CategoryContext.Provider value={{
            editId,
            setEditId,
            render,
            setRender
        }}>
            {children}
        </CategoryContext.Provider>
    )
}
export default CategoryContextContainer;