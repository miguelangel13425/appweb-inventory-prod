import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../../../redux/store";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { fetchWarehouses } from "@/app/redux/actions/warehouseActions";
import { Spinner } from "@/components/ui/spinner";
import CreateWarehouseModal from "../components/CreateWarehouseModal";

const WarehouseList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { warehouses, loading, error } = useSelector(
    (state: RootState) => state.inventory.warehouse
  );

  useEffect(() => {
    dispatch(fetchWarehouses());
  }, [dispatch]);

  if (loading) return <Spinner />;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <div>Hello</div>
    </>
  );
};

export default WarehouseList;
