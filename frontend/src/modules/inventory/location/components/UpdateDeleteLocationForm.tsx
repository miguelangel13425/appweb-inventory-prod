import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import {
  updateLocation,
  deleteLocation,
} from "@/redux/actions/inventory/locationActions";
import { Location } from "@/redux/models/inventory";
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

interface UpdateDeleteLocationFormProps {
  location: Location;
}

const UpdateDeleteLocationForm: React.FC<UpdateDeleteLocationFormProps> = ({
  location,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { status, detailCode, message, errors } = useSelector(
    (state: RootState) => state.location
  );
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    name: location.name,
    description: location.description,
  });

  const [isAlertDialogOpen, setIsAlertDialogOpen] = useState(false);

  useEffect(() => {
    setFormData({
      name: location.name,
      description: location.description,
    });
  }, [location]);

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
    dispatch(updateLocation(location.id, formData));
  };

  const handleDelete = () => {
    setIsAlertDialogOpen(true);
  };

  const confirmDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    dispatch(deleteLocation(location.id));
    toast({
      title: "¡Hecho!",
      description: "¡Ubicación eliminada con éxito!",
    });
    setIsAlertDialogOpen(false);
    handleBack();
  };

  const handleBack = () => {
    navigate("/ubicaciones");
  };

  useEffect(() => {
    if (detailCode === "UPDATE_LOCATION_SUCCESS") {
      toast({
        title: "¡Muy bien!",
        description: message,
      });
    }
    if (detailCode === "UPDATE_LOCATION_VALIDATION_ERROR") {
      toast({
        title: "¡Lo siento!",
        description: message,
      });
    }
  }, [dispatch, detailCode]);

  return (
    <Card className="p-6">
      <CardHeader>
        <CardTitle>Configuración de Ubicación</CardTitle>
        <CardDescription>
          Modifica los detalles de la ubicación.
        </CardDescription>
        <div className="mb-4">
          <Label
            htmlFor="created_at"
            className="block text-sm font-medium text-gray-700"
          >
            Creado el {location.created_at}
          </Label>
        </div>
        <div className="mb-4">
          <Label
            htmlFor="is_active"
            className="block text-sm font-medium text-gray-700"
          >
            Esta ubicación está{" "}
            <strong className="text-gray-900">
              {location.is_active ? "vigente" : "descontinuada"}
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
                      permanentemente la ubicación y sus datos asociados.
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

export default UpdateDeleteLocationForm;
