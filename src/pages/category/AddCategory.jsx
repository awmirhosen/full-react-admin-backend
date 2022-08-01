import React, {useContext, useEffect, useState} from "react";
import ModalsContainer from "../../components/ModalsContainer";
import * as Yup from "yup";
import { Form, Formik } from "formik";
import FormikControl from "../../components/form/FormikControl";
import { Alert } from "../../utils/alert";
import {
  createNewCategoryService, editCategoryService,
  getCategoriesService,
  getSingleCategoryService
} from "../../services/category";
import SubmitButton from "../../components/form/SubmitButton";
import {useParams} from "react-router-dom";
import {CategoryContext} from "../../context/categoryContext";

const validationSchema = Yup.object({
  parent_id: Yup.number(),
  title: Yup.string()
    .required("لطفا این قسمت را پر کنید")
    .matches(
      /^[\u0600-\u06FF\sa-zA-Z0-9@!%$?&]+$/,
      "فقط از حروف و اعداد استفاده شود"
    ),
  description: Yup.string().matches(
    /^[\u0600-\u06FF\sa-zA-Z0-9@!%$?&]+$/,
    "فقط از حروف و اعداد استفاده شود"
  ),
  image: Yup.mixed()
    .test("filesize", "حجم فایل نمیتواند بیشتر 500 کیلوبایت باشد", (value) =>
      !value ? true : value.size <= 500 * 1024
    )
    .test("format", "فرمت فایل باید jpg باشد", (value) =>
      !value ? true : value.type === "image/jpeg"
    ),
  is_active: Yup.boolean(),
  show_in_menu: Yup.boolean(),
});

const Addcategory = () => {
  // state and context
  const params = useParams()
  const [parents, setParents] = useState([]);
  const [reInitialValues, setReInitialValues] = useState(null);
  const {editId, setEditId, render, setRender} = useContext(CategoryContext)
  const [editCategory, setEditCategory] = useState(null);


  // initial values start
  const initialValues = {
    parent_id: "",
    title: "",
    description: "",
    image: null,
    is_active: true,
    show_in_menu: true,
  };

  // define on submit function
  const onSubmit = async (values, actions) => {
    try {
      values = {
        ...values,
        is_active : values.is_active ? 1 : 0,
        show_in_menu : values.is_active ? 1 : 0,
      }
      if (editId) {
        const res = await editCategoryService(editId, values)
        if (res.status === 200) {
          Alert('رکورد ویرایش شد', res.data.message, 'success')
          setRender(render+1)
        }
      } else {
      const res = await createNewCategoryService(values)
      if (res.status === 201 ) {
        Alert('رکورد ثبت شد', 'عملیات با موفقیت انجام شد', 'success')
        actions.resetForm();
      }
      }
    } catch (error) {
      Alert('ارور', 'مشکلی پیش آمده', 'error')
    }
  };


  const handleGetParentsCategories = async () =>  {
    try {
      const res = await getCategoriesService();
      if (res.status == 200) {
        const allParents = res.data.data;
        setParents(
          allParents.map((p) => {
            return { id: p.id, value: p.title };
          })
        );
      }
    } catch (error) {
      Alert("مشکل...!", "متاسفانه دسته بندی های والد دریافت نشد", "warning");
    }
  };
  useEffect(() => {
    handleGetParentsCategories();
  }, []);

  useEffect(()=>{

    if (editCategory) {
      setReInitialValues({
        parent_id: editCategory.parent_id,
        title: editCategory.title,
        description: editCategory.description,
        image: null,
        is_active: editCategory.is_active ? true : false,
        show_in_menu: editCategory.show_in_menu ? true : false,
      })
    }else if (params.categoryId) {
      setReInitialValues({
        ...initialValues,
        parent_id: params.categoryId
      })
    }else{
      setReInitialValues(null)
    }
  },[params.categoryId, editCategory])

  const handleGetSingleCategory = async () => {
    try {
      const res = await getSingleCategoryService(editId)
      if (res.status === 200) {
        const category = res.data.data;
        setEditCategory(category)
      }
    } catch (error) {
      Alert('مشکل' , 'مشکلی پیش آمده', 'warning')
    }
  }

  useEffect(() => {
    if (editId){
      handleGetSingleCategory()
    } else setEditCategory(null)
  }, [editId]);


  return (
    <>
      <button
        className="btn btn-success d-flex justify-content-center align-items-center"
        data-bs-toggle="modal"
        data-bs-target="#add_product_category_modal"
        onClick={() => setEditId(null)}
      >
        <i className="fas fa-plus text-light"/>
      </button>

      <ModalsContainer
        fullScreen={true}
        id="add_product_category_modal"
        title={ editId ? "ویرایش دسته" : 'اضافه کردن دسته'}
      >
        <Formik
          initialValues={reInitialValues || initialValues}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
          enableReinitialize
        >
          <Form>
            <div className="container">
              <div className="row justify-content-center">
                {parents.length > 0 ? (
                  <FormikControl
                    className="col-md-6 col-lg-8"
                    control="select"
                    options={parents}
                    name="parent_id"
                    label="دسته والد"
                  />
                ) : null}
                <FormikControl
                  className="col-md-6 col-lg-8"
                  control="input"
                  type="text"
                  name="title"
                  label="عنوان دسته"
                  placeholder="عنوان دسته"
                />
                <FormikControl
                  className="col-md-6 col-lg-8"
                  control="textarea"
                  name="description"
                  label="توضیحات"
                  placeholder="توضیحات"
                />
                {editId ? (
                    null
                ) : (
                    <FormikControl
                        className="col-md-6 col-lg-8"
                        control="file"
                        name="image"
                        label="تصویر"
                        placeholder="تصویر"
                    />
                )}

                <div className="col-12 col-md-6 col-lg-8 row justify-content-center">
                  <div className="col-12 col-md-4 col-lg-3 mx-lg-5">
                    <FormikControl
                      control="switch"
                      name="is_active"
                      label="وضعیت فعال"
                    />
                  </div>
                  <div className="col-12 col-md-4 col-lg-3 mx-lg-5">
                    <FormikControl
                      control="switch"
                      name="show_in_menu"
                      label="نمایش در منو"
                    />
                  </div>
                </div>
                <div className="btn_box text-center col-12 col-md-6 col-lg-8 mt-4">
                  <SubmitButton />
                </div>
              </div>
            </div>
          </Form>
        </Formik>
      </ModalsContainer>
    </>
  );
};

export default Addcategory;
