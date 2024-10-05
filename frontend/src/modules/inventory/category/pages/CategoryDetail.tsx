import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/redux/store";
import { fetchCategory } from "@/redux/actions/inventory/categoryActions";
import { Spinner } from "@/components";
import {
  Unauthorized,
  Forbidden,
  NotFound,
  ServerError,
} from "@/modules/base/index";
import UpdateDeleteCategoryForm from "../components/UpdateDeleteCategoryForm";

const CategoryDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const { category, loading, error, status } = useSelector(
    (state: RootState) => state.category
  );

  useEffect(() => {
    dispatch(fetchCategory(id));
  }, [dispatch, id]);

  if (loading) return <Spinner />;

  if (error) {
    if (status === 401) return <Unauthorized />;
    if (status === 403) return <Forbidden />;
    if (status === 404) return <NotFound />;
    if (status === 500) return <ServerError />;
  }

  if (!category) return null;

  return (
    <div className="p-8">
      <UpdateDeleteCategoryForm category={category} />
    </div>
  );
};

export default CategoryDetail;
