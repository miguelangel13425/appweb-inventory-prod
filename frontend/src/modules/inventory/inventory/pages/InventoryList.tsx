import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { fetchInventories } from "@/redux/actions/inventory/inventoryActions";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Spinner, Card, Input, Badge } from "@/components/index";
import {
  NotFound,
  Unauthorized,
  Forbidden,
  ServerError,
} from "@/modules/base/index";
import { Edit } from "@geist-ui/icons";
import CreateInventoryModal from "../components/CreateInventoryModal";
import { Inventory } from "@/redux/models/inventory";

const InventoryList: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const { inventories, loading, status, error, pagination } = useSelector(
    (state: RootState) => state.inventory
  );
  const [searchTerm, setSearchTerm] = useState("");

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= (pagination?.totalPages || 1)) {
      dispatch(fetchInventories(page, searchTerm));
    }
  };

  useEffect(() => {
    dispatch(fetchInventories(1, searchTerm));
  }, [dispatch, searchTerm]);

  const createPageLinks = () => {
    const pages = [];
    const totalPages = pagination?.totalPages || 1;

    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <PaginationItem key={i}>
          <PaginationLink
            onClick={() => handlePageChange(i)}
            className={
              pagination?.currentPage === i
                ? "font-bold cursor-pointer"
                : "cursor-pointer"
            }
          >
            {i}
          </PaginationLink>
        </PaginationItem>
      );
    }
    return pages;
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSettings = (id: string) => {
    navigate(`/inventarios/${id}`);
  };

  const getBadgeColor = (availability: string) => {
    switch (availability) {
      case "Sin existencia":
        return "bg-red-400";
      case "Baja":
        return "bg-yellow-400";
      case "Media":
        return "bg-orange-400";
      case "Alta":
        return "bg-green-400";
      default:
        return "bg-gray-400";
    }
  };

  if (error) {
    if (status === 401) return <Unauthorized />;
    if (status === 403) return <Forbidden />;
    if (status === 404) return <NotFound />;
    if (status === 500) return <ServerError />;
  }

  return (
    <Card className="p-6 bg-gray-100">
      <div className="mb-4 flex justify-between">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Inventarios</h2>
        <CreateInventoryModal />
      </div>
      <Input
        type="text"
        placeholder="Buscar por nombre o campus"
        value={searchTerm}
        onChange={handleSearchChange}
        className="mb-4"
      />
      {loading ? (
        <Spinner />
      ) : inventories.length === 0 ? (
        <div className="text-gray-500">No hay inventarios.</div>
      ) : (
        <>
          <Table className="min-w-full bg-white rounded-lg shadow-md">
            <TableCaption className="text-gray-500">
              {pagination?.totalItems} inventario(s) encontrado(s).
            </TableCaption>
            <TableHeader>
              <TableRow className="bg-gray-200">
                <TableHead className="px-4 py-2 text-left text-gray-600">
                  Partida
                </TableHead>
                <TableHead className="px-4 py-2 text-left text-gray-600">
                  Nombre
                </TableHead>
                <TableHead className="px-4 py-2 text-left text-gray-600">
                  Unidad
                </TableHead>
                <TableHead className="px-4 py-2 text-left text-gray-600">
                  Ubicación
                </TableHead>
                <TableHead className="px-4 py-2 text-left text-gray-600">
                  Campus
                </TableHead>
                <TableHead className="px-4 py-2 text-left text-gray-600">
                  Existencia
                </TableHead>
                <TableHead className="px-4 py-2 text-left text-gray-600">
                  Disponibilidad
                </TableHead>
                <TableHead className="px-4 py-2 text-left"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {inventories.map((inventory: Inventory) => (
                <TableRow key={inventory.id} className="hover:bg-gray-100">
                  <TableCell className="px-4 py-2 border-b border-gray-200">
                    {inventory.product.category.code} -{" "}
                    {inventory.product.category.name}
                  </TableCell>
                  <TableCell className="px-4 py-2 border-b border-gray-200">
                    {inventory.product.name}
                  </TableCell>
                  <TableCell className="px-4 py-2 border-b border-gray-200">
                    {inventory.product.unit_display}
                  </TableCell>
                  <TableCell className="px-4 py-2 border-b border-gray-200">
                    {inventory.location.name}
                  </TableCell>
                  <TableCell className="px-4 py-2 border-b border-gray-200">
                    {inventory.location.warehouse.name}
                  </TableCell>
                  <TableCell className="px-4 py-2 border-b border-gray-200 text-center">
                    {inventory.quantity}
                  </TableCell>
                  <TableCell className="px-4 py-2 border-b border-gray-200 text-center">
                    <Badge
                      className={getBadgeColor(inventory.availability_display)}
                    >
                      {inventory.availability_display}
                    </Badge>
                  </TableCell>
                  <TableCell className="px-4 py-2 border-b border-gray-200 text-right">
                    <Edit
                      size={20}
                      className="text-impactBlue cursor-pointer"
                      onClick={() => handleSettings(inventory.id)}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="flex justify-between items-center mt-4">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    className="cursor-pointer"
                    onClick={() =>
                      handlePageChange(pagination!.currentPage - 1)
                    }
                    disabled={pagination?.currentPage <= 1}
                  />
                </PaginationItem>
                {createPageLinks()}
                <PaginationItem>
                  <PaginationNext
                    className="cursor-pointer"
                    onClick={() =>
                      handlePageChange(pagination!.currentPage + 1)
                    }
                    disabled={pagination?.currentPage >= pagination?.totalPages}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </>
      )}
    </Card>
  );
};

export default InventoryList;
