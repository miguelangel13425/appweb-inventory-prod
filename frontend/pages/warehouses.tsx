import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../app/redux/store"; // Ajusta la ruta según tu estructura
import { fetchWarehouses } from "../app/redux/actions/warehouseActions"; // Ajusta la ruta según tu estructura
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table"; // Ajusta la ruta según tu estructura

const WarehousesPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { warehouses, loading, error, pagination } = useSelector(
    (state: RootState) => state.inventory.warehouse
  );
  const [currentPage, setCurrentPage] = useState<number>(
    pagination?.currentPage || 1
  );

  useEffect(() => {
    dispatch(fetchWarehouses(currentPage));
  }, [dispatch, currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <h1 className="text-2xl font-bold mb-4">Warehouses</h1>
      {warehouses.length > 0 ? (
        <Table className="min-w-full bg-white border border-gray-200">
          <TableCaption className="text-left text-xs text-gray-500 py-2">
            A list of warehouses
          </TableCaption>
          <TableHeader className="bg-gray-100">
            <TableRow>
              <TableHead className="px-4 py-2 border-b border-gray-200">
                ID
              </TableHead>
              <TableHead className="px-4 py-2 border-b border-gray-200">
                Name
              </TableHead>
              <TableHead className="px-4 py-2 border-b border-gray-200">
                Description
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {warehouses.map((warehouse) => (
              <TableRow key={warehouse.id} className="hover:bg-gray-50">
                <TableCell className="px-4 py-2 border-b border-gray-200">
                  {warehouse.id}
                </TableCell>
                <TableCell className="text-blue-50">{warehouse.name}</TableCell>
                <TableCell className="right">{warehouse.description}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <div>No warehouses found.</div>
      )}
      <div className="mt-4 flex justify-center">
        {Array.from({ length: pagination?.totalPages || 1 }, (_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            disabled={currentPage === index + 1}
            className={`px-4 py-2 mx-1 border rounded ${
              currentPage === index + 1
                ? "bg-blue-500 text-white"
                : "bg-white text-blue-500 hover:bg-blue-500 hover:text-white"
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </>
  );
};

export default WarehousesPage;
