import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import {
  updateWarehouse,
  deleteWarehouse,
} from "@/redux/actions/inventory/warehouseActions";
import { Warehouse } from "@/redux/models/inventory";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button, Input, Textarea, Label } from "@/components/index";

interface UpdateDeleteWarehouseFormProps {
  warehouse: Warehouse;
}

const UpdateDeleteWarehouseForm: React.FC<UpdateDeleteWarehouseFormProps> = ({
  warehouse,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const [formData, setFormData] = useState({
    name: warehouse.name,
    description: warehouse.description,
    is_active: warehouse.is_active,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(updateWarehouse(warehouse.id, formData));
    navigate("/warehouses");
  };

  const handleDelete = () => {
    dispatch(deleteWarehouse(warehouse.id));
    navigate("/warehouses");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Configuración de Almacén</CardTitle>
        <CardDescription>Modifica los detalles del almacén.</CardDescription>
        <div className="mb-4">
          <Label
            htmlFor="created_at"
            className="block text-sm font-medium text-gray-700"
          >
            Creado el {warehouse.created_at}
          </Label>
        </div>
        <div className="mb-4">
          <Label
            htmlFor="updated_at"
            className="block text-sm font-medium text-gray-700"
          >
            Actualizado el {warehouse.updated_at}
          </Label>
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <Label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Nombre
            </Label>
            <Input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              className="mt-1 block w-full"
            />
          </div>
          <div className="mb-4">
            <Label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              Descripción
            </Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="mt-1 block w-full"
            />
          </div>
          <div className="mb-4 flex items-center">
            <Input
              id="is_active"
              name="is_active"
              type="checkbox"
              checked={formData.is_active}
              onChange={handleChange}
              className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
            />
            <Label
              htmlFor="is_active"
              className="ml-2 block text-sm text-gray-900"
            >
              Activo
            </Label>
          </div>
          <div className="flex space-x-4">
            <Button type="submit" className="bg-sunnyYellow text-white">
              Actualizar
            </Button>
            <Button
              type="button"
              onClick={handleDelete}
              className="bg-smartRed text-white"
            >
              Eliminar
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default UpdateDeleteWarehouseForm;
