import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
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
import { useToast } from "@/hooks/use-toast"; // Asumimos que tienes un hook para toast
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";

interface UpdateDeleteWarehouseFormProps {
  warehouse: Warehouse;
}

const UpdateDeleteWarehouseForm: React.FC<UpdateDeleteWarehouseFormProps> = ({
  warehouse,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { status, detailCode, message, errors } = useSelector(
    (state: RootState) => state.warehouse
  );
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    name: warehouse.name,
    description: warehouse.description,
  });

  const [isAlertDialogOpen, setIsAlertDialogOpen] = useState(false);

  useEffect(() => {
    setFormData({
      name: warehouse.name,
      description: warehouse.description,
    });
  }, [warehouse]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(updateWarehouse(warehouse.id, formData));
  };

  const handleDelete = () => {
    setIsAlertDialogOpen(true);
  };

  const confirmDelete = () => {
    dispatch(deleteWarehouse(warehouse.id));
    setIsAlertDialogOpen(false);
  };

  const handleBack = () => {
    navigate("/warehouses");
  };

  useEffect(() => {
    console.log(detailCode, status, message, errors);
  }, [detailCode, status, message, errors]);

  useEffect(() => {
    if (detailCode === "UPDATE_WAREHOUSE_SUCCESS") {
      toast({
        title: "¡Muy bien!",
        description: message,
      });
    }
  }, [detailCode, message, toast]);

  useEffect(() => {
    if (detailCode === "DELETE_WAREHOUSE_SUCCESS") {
      toast({
        title: "¡Hecho!",
        description: message,
      });
      navigate("/warehouses");
    }
  }, [detailCode, message, navigate, toast]);

  useEffect(() => {
    if (status === 400) {
      toast({
        title: "¡Lo siento!",
        description: message,
      });
    }
  }, [status, message, toast]);

  return (
    <Card className="p-6">
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
            {errors?.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name[0]}</p>
            )}
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
            {errors?.description && (
              <p className="text-red-500 text-sm mt-1">
                {errors.description[0]}
              </p>
            )}
          </div>
          <div className="flex justify-between">
            <Button
              type="button"
              onClick={handleBack}
              className="bg-vibrantCyan text-white"
            >
              Volver
            </Button>
            <div className="flex space-x-4">
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button type="button" className="bg-smartRed text-white">
                    Eliminar
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
                    <AlertDialogDescription>
                      Esta acción no se puede deshacer. Esto eliminará
                      permanentemente el almacén y sus datos asociados.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                    <AlertDialogAction onClick={confirmDelete}>
                      Eliminar
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
              <Button type="submit" className="bg-sunnyYellow text-white">
                Actualizar
              </Button>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default UpdateDeleteWarehouseForm;
