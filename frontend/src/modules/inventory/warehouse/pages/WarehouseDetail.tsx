import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/redux/store";
import { fetchWarehouse } from "@/redux/actions/inventory/warehouseActions";
import { Spinner } from "@/components";
import {
  Unauthorized,
  Forbidden,
  NotFound,
  ServerError,
} from "@/modules/base/index";
import UpdateDeleteWarehouseForm from "../components/UpdateDeleteWarehouseForm";

const WarehouseDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const { warehouse, loading, error, status } = useSelector(
    (state: RootState) => state.warehouse
  );

  useEffect(() => {
    dispatch(fetchWarehouse(id));
  }, [dispatch, id]);

  if (loading) return <Spinner />;

  if (error) {
    if (status === 401) return <Unauthorized />;
    if (status === 403) return <Forbidden />;
    if (status === 404) return <NotFound />;
    if (status === 500) return <ServerError />;
  }

  return (
    <div>
      {warehouse && <UpdateDeleteWarehouseForm warehouse={warehouse} />}
    </div>
  );
};

export default WarehouseDetail;
