import React, {useContext, useEffect, useState} from "react";
import PaginatedTable from "../../components/PaginatedTable";
import {deleteCategoryService, getCategoriesService} from "../../services/category";
import {Alert, Confirm} from "../../utils/alert";
import Addcategory from "./AddCategory";
import Actions from "./tableAdditons/Actions";
import ShowInMenu from "./tableAdditons/ShowInMenu";
import {useLocation, useParams} from "react-router-dom";
import jMoment from 'jalali-moment'
import {CategoryContext} from "../../context/categoryContext";

const Categorytable = () => {
   // state and context
  const {render, setRender} = useContext(CategoryContext)
  const params = useParams()
  const location = useLocation()
  const [data , setData] = useState([])

  // get category data function
  const handleGetCategories = async ()=>{
    try {
      const res = await getCategoriesService(params.categoryId)
      if (res.status === 200) {
        setData(res.data.data)
      }else{
        Alert('مشکل...!',res.data.message,'error');
      }
    } catch (error) {
      Alert('مشکل...!',"مشکلی از سمت سرور رخ داده",'error');
    }
  }

  // delete function
  const handleDeleteCategory = async (rowData)=>{
    if (await Confirm('حذف دسته بندی', `آیا از حذف ${rowData.title} اطمینان دارید؟`)) {
      try {
        const res = await deleteCategoryService(rowData.id);
        if (res.status === 200) {
          setData(data.filter(d=>d.id != rowData.id))
          Alert('انجام شد', res.data.message, 'success')
        }
      } catch (error) {
        console.log(error);
      }
    }
  }

  // calling the get data function
  useEffect(()=>{
    handleGetCategories();
  },[params, render])

  // table title and field data
  const dataInfo = [
    { field: "id", title: "#" },
    { field: "title", title: "عنوان محصول" },
    { field: "parent_id", title: "والد" },
  ];

  // these are manually field that add to table
  const additionField = [
    {
      title: "تاریخ",
      elements: (rowData) => jMoment(rowData.created_at).format('jYYYY/jMM/jDD'),
    },
    {
      title: "نمایش در منو",
      elements: (rowData) => <ShowInMenu rowData={rowData}/>,
    },
    {
      title: "عملیات",
      elements: (rowData) => <Actions rowData={rowData} handleDeleteCategory={handleDeleteCategory}/>,
    }
  ];

  // search bar
  const searchParams = {
    title: "جستجو",
    placeholder: "قسمتی از عنوان را وارد کنید",
    searchField: "title"
  }

  return (
    <>

      { location.state ? (
          <h5 className='text-center text-info'>
            دسته ی
            {'  '}
            {location.state.parentData.title}
          </h5>
      ) : null }

      <PaginatedTable
        data={data}
        dataInfo={dataInfo}
        additionField={additionField}
        numOfPAge={8}
        searchParams={searchParams}
      >
        <Addcategory />
      </PaginatedTable>
    </>
    // <>
    //   <table className="table table-responsive text-center table-hover table-bordered">
    //     <thead className="table-secondary">
    //       <tr>
    //         <th>#</th>
    //         <th>عنوان</th>
    //         <th>وضعیت</th>
    //         <th>عملیات</th>
    //       </tr>
    //     </thead>
    //     <tbody>
    //       <tr>
    //         <td>1</td>
    //         <td>دسته شماره فلان</td>
    //         <td>فعال</td>
    //         <td>
    //           <i
    //             className="fas fa-project-diagram text-info mx-1 hoverable_text pointer has_tooltip"
    //             title="زیرمجموعه"
    //             data-bs-toggle="tooltip"
    //             data-bs-placement="top"
    //           ></i>
    //           <i
    //             className="fas fa-edit text-warning mx-1 hoverable_text pointer has_tooltip"
    //             title="ویرایش دسته"
    //             data-bs-toggle="modal"
    //             data-bs-placement="top"
    //             data-bs-target="#add_product_category_modal"
    //           ></i>
    //           <i
    //             className="fas fa-plus text-success mx-1 hoverable_text pointer has_tooltip"
    //             title="افزودن ویژگی"
    //             data-bs-toggle="modal"
    //             data-bs-target="#add_product_category_attr_modal"
    //           ></i>
    //           <i
    //             className="fas fa-times text-danger mx-1 hoverable_text pointer has_tooltip"
    //             title="حذف دسته"
    //             data-bs-toggle="tooltip"
    //             data-bs-placement="top"
    //           ></i>
    //         </td>
    //       </tr>
    //       <tr>
    //         <td>1</td>
    //         <td>دسته شماره فلان</td>
    //         <td>فعال</td>
    //         <td>
    //           <i
    //             className="fas fa-project-diagram text-info mx-1 hoverable_text pointer has_tooltip"
    //             title="زیرمجموعه"
    //             data-bs-toggle="tooltip"
    //             data-bs-placement="top"
    //           ></i>
    //           <i
    //             className="fas fa-edit text-warning mx-1 hoverable_text pointer has_tooltip"
    //             title="ویرایش دسته"
    //             data-bs-toggle="tooltip"
    //             data-bs-placement="top"
    //           ></i>
    //           <i
    //             className="fas fa-plus text-success mx-1 hoverable_text pointer has_tooltip"
    //             title="افزودن ویژگی"
    //             data-bs-placement="top"
    //             data-bs-toggle="modal"
    //             data-bs-target="#add_product_category_attr_modal"
    //           ></i>
    //           <i
    //             className="fas fa-times text-danger mx-1 hoverable_text pointer has_tooltip"
    //             title="حذف دسته"
    //             data-bs-toggle="tooltip"
    //             data-bs-placement="top"
    //           ></i>
    //         </td>
    //       </tr>
    //       <tr>
    //         <td>1</td>
    //         <td>دسته شماره فلان</td>
    //         <td>فعال</td>
    //         <td>
    //           <i
    //             className="fas fa-project-diagram text-info mx-1 hoverable_text pointer has_tooltip"
    //             title="زیرمجموعه"
    //             data-bs-toggle="tooltip"
    //             data-bs-placement="top"
    //           ></i>
    //           <i
    //             className="fas fa-edit text-warning mx-1 hoverable_text pointer has_tooltip"
    //             title="ویرایش دسته"
    //             data-bs-toggle="tooltip"
    //             data-bs-placement="top"
    //           ></i>
    //           <i
    //             className="fas fa-plus text-success mx-1 hoverable_text pointer has_tooltip"
    //             title="افزودن ویژگی"
    //             data-bs-placement="top"
    //             data-bs-toggle="modal"
    //             data-bs-target="#add_product_category_attr_modal"
    //           ></i>
    //           <i
    //             className="fas fa-times text-danger mx-1 hoverable_text pointer has_tooltip"
    //             title="حذف دسته"
    //             data-bs-toggle="tooltip"
    //             data-bs-placement="top"
    //           ></i>
    //         </td>
    //       </tr>
    //       <tr>
    //         <td>1</td>
    //         <td>دسته شماره فلان</td>
    //         <td>فعال</td>
    //         <td>
    //           <i
    //             className="fas fa-project-diagram text-info mx-1 hoverable_text pointer has_tooltip"
    //             title="زیرمجموعه"
    //             data-bs-toggle="tooltip"
    //             data-bs-placement="top"
    //           ></i>
    //           <i
    //             className="fas fa-edit text-warning mx-1 hoverable_text pointer has_tooltip"
    //             title="ویرایش دسته"
    //             data-bs-toggle="tooltip"
    //             data-bs-placement="top"
    //           ></i>
    //           <i
    //             className="fas fa-plus text-success mx-1 hoverable_text pointer has_tooltip"
    //             title="افزودن ویژگی"
    //             data-bs-placement="top"
    //             data-bs-toggle="modal"
    //             data-bs-target="#add_product_category_attr_modal"
    //           ></i>
    //           <i
    //             className="fas fa-times text-danger mx-1 hoverable_text pointer has_tooltip"
    //             title="حذف دسته"
    //             data-bs-toggle="tooltip"
    //             data-bs-placement="top"
    //           ></i>
    //         </td>
    //       </tr>
    //     </tbody>
    //   </table>
    //   <nav
    //     aria-label="Page navigation example"
    //     className="d-flex justify-content-center"
    //   >
    //     <ul className="pagination dir_ltr">
    //       <li className="page-item">
    //         <a className="page-link" href="#" aria-label="Previous">
    //           <span aria-hidden="true">&raquo;</span>
    //         </a>
    //       </li>
    //       <li className="page-item">
    //         <a className="page-link" href="#">
    //           1
    //         </a>
    //       </li>
    //       <li className="page-item">
    //         <a className="page-link" href="#">
    //           2
    //         </a>
    //       </li>
    //       <li className="page-item">
    //         <a className="page-link" href="#">
    //           3
    //         </a>
    //       </li>
    //       <li className="page-item">
    //         <a className="page-link" href="#" aria-label="Next">
    //           <span aria-hidden="true">&laquo;</span>
    //         </a>
    //       </li>
    //     </ul>
    //   </nav>
    // </>
  );
};

export default Categorytable;
