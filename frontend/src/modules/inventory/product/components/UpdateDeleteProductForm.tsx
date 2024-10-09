import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import {
  updateProduct,
  deleteProduct,
} from "@/redux/actions/inventory/productActions";
import { Product } from "@/redux/models/inventory";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button, Input, Textarea, Switch, Label } from "@/components/index";
import { useToast } from "@/hooks/use-toast";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface UpdateDeleteProductFormProps {
  product: Product;
}

const UpdateDeleteProductForm: React.FC<UpdateDeleteProductFormProps> = ({
  product,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { status, detailCode, message, errors } = useSelector(
    (state: RootState) => state.product
  );
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    name: product.name,
    description: product.description,
    unit: product.unit,
    is_single_use: product.is_single_use,
  });

  const [isAlertDialogOpen, setIsAlertDialogOpen] = useState(false);

  useEffect(() => {
    setFormData({
      name: product.name,
      description: product.description,
      unit: product.unit,
      is_single_use: product.is_single_use,
    });
  }, [product]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleUnitChange = (value: string) => {
    setFormData({ ...formData, unit: value });
  };

  const handleSingleUseChange = (value: boolean) => {
    setFormData({ ...formData, is_single_use: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(updateProduct(product.id, formData));
  };

  const handleDelete = () => {
    setIsAlertDialogOpen(true);
  };

  const confirmDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    dispatch(deleteProduct(product.id));
    toast({
      title: "¡Hecho!",
      description: "¡Producto eliminado con éxito!",
    });
    setIsAlertDialogOpen(false);
    handleBack();
  };

  const handleBack = () => {
    navigate("/productos");
  };

  useEffect(() => {
    if (detailCode === "UPDATE_PRODUCT_SUCCESS") {
      toast({
        title: "¡Muy bien!",
        description: message,
      });
    }
    if (detailCode === "UPDATE_PRODUCT_VALIDATION_ERROR") {
      toast({
        title: "¡Lo siento!",
        description: message,
      });
    }
  }, [dispatch, detailCode]);

  return (
    <Card className="p-6">
      <CardHeader>
        <CardTitle>Configuración de Producto</CardTitle>
        <CardDescription>Modifica los detalles del producto.</CardDescription>
        <div className="mb-4">
          <Label
            htmlFor="created_at"
            className="block text-sm font-medium text-gray-700"
          >
            Creado el {product.created_at}
          </Label>
        </div>
        <div className="mb-4">
          <Label
            htmlFor="created_at"
            className="block text-sm font-medium text-gray-700"
          >
            Partida{" "}
            <strong className="text-gray-900">{product.category.code}</strong>
            {" - "}
            <strong className="text-gray-900">{product.category.name}</strong>
          </Label>
        </div>
        <div className="mb-4">
          <Label
            htmlFor="is_active"
            className="block text-sm font-medium text-gray-700"
          >
            Este producto está{" "}
            <strong className="text-gray-900">
              {product.is_active ? "vigente" : "descontinuada"}
            </strong>
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
          <div className="mb-4">
            <Label
              htmlFor="unit"
              className="block text-sm font-medium text-gray-700"
            >
              Unidad
            </Label>
            <Select value={formData.unit} onValueChange={handleUnitChange}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Seleccione una unidad" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="GAL">Galón</SelectItem>
                <SelectItem value="PC">Pieza</SelectItem>
                <SelectItem value="BOX">Caja</SelectItem>
                <SelectItem value="M">Metro</SelectItem>
                <SelectItem value="PKG">Paquete</SelectItem>
              </SelectContent>
            </Select>
            {errors?.unit && (
              <p className="text-red-500 text-sm mt-1">{errors.unit[0]}</p>
            )}
          </div>
          <div className="mb-4">
            <div className="flex items-center space-x-2">
              <Switch
                checked={formData.is_single_use}
                onCheckedChange={handleSingleUseChange}
              />
              <Label className="text-gray-500" htmlFor="is_single_use">
                Consumible
              </Label>
            </div>
            {errors?.is_single_use && (
              <p className="text-red-500 text-sm mt-1">
                {errors.is_single_use[0]}
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
                      permanentemente el producto y sus datos asociados.
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

export default UpdateDeleteProductForm;
