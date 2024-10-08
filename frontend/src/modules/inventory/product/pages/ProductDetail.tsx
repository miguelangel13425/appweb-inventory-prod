import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/redux/store";
import { fetchProduct } from "@/redux/actions/inventory/productActions";
import { Spinner } from "@/components";
import {
  Unauthorized,
  Forbidden,
  NotFound,
  ServerError,
} from "@/modules/base/index";
import UpdateDeleteProductForm from "../components/UpdateDeleteProductForm";

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const { product, loading, error, status } = useSelector(
    (state: RootState) => state.product
  );

  useEffect(() => {
    dispatch(fetchProduct(id));
  }, [dispatch, id]);

  if (loading) return <Spinner />;

  if (error) {
    if (status === 401) return <Unauthorized />;
    if (status === 403) return <Forbidden />;
    if (status === 404) return <NotFound />;
    if (status === 500) return <ServerError />;
  }

  if (!product) return null;

  return (
    <div className="p-8">
      <UpdateDeleteProductForm product={product} />
    </div>
  );
};

export default ProductDetail;
