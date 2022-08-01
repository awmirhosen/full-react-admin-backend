import React, {useContext} from "react";
import {useNavigate, useParams} from "react-router-dom";
import categoryContext, {CategoryContext} from "../../../context/categoryContext";

const Actions = ({rowData, handleDeleteCategory}) => {
    const {setEditId} = useContext(CategoryContext)
    const params = useParams()
    const navigate = useNavigate()

  return (
    <>
        {
            !params.categoryId ? (
                <i
                    className="fas fa-project-diagram text-info mx-1 hoverable_text pointer has_tooltip"
                    title="زیرمجموعه"
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    onClick={() => navigate(`${rowData.id}`, {
                            state : {
                                parentData : rowData
                            },
                        }
                    )}
                />
            ) : null
        }



      <i
        className="fas fa-edit text-warning mx-1 hoverable_text pointer has_tooltip"
        title="ویرایش دسته"
        data-bs-placement="top"
        data-bs-toggle="modal"
        data-bs-target="#add_product_category_modal"
        onClick={() => setEditId(rowData.id)}
       />
      <i
        className="fas fa-plus text-success mx-1 hoverable_text pointer has_tooltip"
        title="افزودن ویژگی"
        data-bs-placement="top"
        data-bs-toggle="modal"
        data-bs-target="#add_product_category_attr_modal"
      />
      <i
        className="fas fa-times text-danger mx-1 hoverable_text pointer has_tooltip"
        title="حذف دسته"
        data-bs-toggle="tooltip"
        data-bs-placement="top"
        onClick={()=>handleDeleteCategory(rowData)}
      />
    </>
  );
};

export default Actions;
