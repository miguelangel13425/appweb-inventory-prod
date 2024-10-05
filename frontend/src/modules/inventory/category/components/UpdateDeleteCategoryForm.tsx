import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import {
  updateCategory,
  deleteCategory,
} from "@/redux/actions/inventory/categoryActions";
import { Category } from "@/redux/models/inventory";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button, Input, Textarea, Label } from "@/components/index";
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

interface UpdateDeleteCategoryFormProps {
  category: Category;
}

const UpdateDeleteCategoryForm: React.FC<UpdateDeleteCategoryFormProps> = ({
  category,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { status, detailCode, message, errors } = useSelector(
    (state: RootState) => state.category
  );
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    code: category.code,
    name: category.name,
    description: category.description,
  });

  const [isAlertDialogOpen, setIsAlertDialogOpen] = useState(false);

  useEffect(() => {
    setFormData({
      code: category.code,
      name: category.name,
      description: category.description,
    });
  }, [category]);

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
    dispatch(updateCategory(category.id, formData));
  };

  const handleDelete = () => {
    setIsAlertDialogOpen(true);
  };

  const confirmDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    dispatch(deleteCategory(category.id));
    toast({
      title: "¡Hecho!",
      description: "¡Categoría eliminada con éxito!",
    });
    setIsAlertDialogOpen(false);
    handleBack();
  };

  const handleBack = () => {
    navigate("/partidas");
  };

  useEffect(() => {
    if (detailCode === "UPDATE_CATEGORY_SUCCESS") {
      toast({
        title: "¡Muy bien!",
        description: message,
      });
    }
    if (detailCode === "UPDATE_CATEGORY_VALIDATION_ERROR") {
      toast({
        title: "¡Lo siento!",
        description: message,
      });
    }
  }, [dispatch, detailCode]);

  return (
    <Card className="p-6">
      <CardHeader>
        <CardTitle>Configuración de Categoría</CardTitle>
        <CardDescription>
          Modifica los detalles de la categoría.
        </CardDescription>
        <div className="mb-4">
          <Label
            htmlFor="created_at"
            className="block text-sm font-medium text-gray-700"
          >
            Creado el {category.created_at}
          </Label>
        </div>
        <div className="mb-4">
          <Label
            htmlFor="is_active"
            className="block text-sm font-medium text-gray-700"
          >
            Esta categoría está{" "}
            <strong className="text-gray-900">
              {category.is_active ? "activa" : "desactivada"}
            </strong>
          </Label>
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <Label
              htmlFor="code"
              className="block text-sm font-medium text-gray-700"
            >
              Código
            </Label>
            <Input
              id="code"
              name="code"
              type="number"
              value={formData.code}
              onChange={handleChange}
              className="mt-1 block w-full"
            />
            {errors?.code && (
              <p className="text-red-500 text-sm mt-1">{errors.code[0]}</p>
            )}
          </div>
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
                      permanentemente la categoría y sus datos asociados.
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

export default UpdateDeleteCategoryForm;
