import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button, Input } from "@/components/index";
import {
  createCategory,
  fetchCategories,
} from "@/redux/actions/inventory/categoryActions";
import { createCategoryFailure } from "@/redux/slices/inventory/categorySlice";
import { RootState, AppDispatch } from "@/redux/store";
import { useToast } from "@/hooks/use-toast";

const CreateCategoryModal: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [form, setForm] = useState({
    code: "",
    name: "",
    description: "",
  });
  const { toast } = useToast();
  const { status, detailCode, message, errors } = useSelector(
    (state: RootState) => state.category
  );
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleCreateCategory = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(createCategory(form));
  };

  useEffect(() => {
    if (detailCode === "CREATE_CATEGORY_SUCCESS") {
      toast({
        title: "¡Listo!",
        description: message,
      });
      dispatch(fetchCategories(1));
      setIsDialogOpen(false);
    } else if (detailCode === "CREATE_CATEGORY_VALIDATION_ERROR") {
      toast({
        title: "¡Lo siento!",
        description: message,
      });
    }
  }, [status, message, toast, dispatch]);

  useEffect(() => {
    if (!isDialogOpen) {
      setForm({
        code: "",
        name: "",
        description: "",
      });
      dispatch(
        createCategoryFailure({
          error: null,
          errors: null,
          status: null,
          detailCode: null,
        })
      );
    }
  }, [isDialogOpen, dispatch]);

  return (
    <div>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <Button className="mb-4 bg-vibrantCyan">Crear categoría</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogTitle>Crear nueva categoría</DialogTitle>
          <DialogDescription>
            Por favor, rellene el formulario para crear una nueva categoría.
          </DialogDescription>
          <form onSubmit={handleCreateCategory} className="mt-4">
            <div className="mb-4">
              <Input
                placeholder="Código"
                value={form.code}
                onChange={(e: any) =>
                  setForm({ ...form, code: e.target.value })
                }
                required
              />
              {errors?.code && (
                <p className="text-red-500 text-sm mt-1">{errors.code[0]}</p>
              )}
            </div>
            <div className="mb-4">
              <Input
                placeholder="Nombre"
                value={form.name}
                onChange={(e: any) =>
                  setForm({ ...form, name: e.target.value })
                }
                required
              />
              {errors?.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name[0]}</p>
              )}
            </div>
            <div className="mb-4">
              <Input
                placeholder="Descripción"
                value={form.description}
                onChange={(e: any) =>
                  setForm({ ...form, description: e.target.value })
                }
              />
              {errors?.description && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.description[0]}
                </p>
              )}
            </div>
            <div className="flex justify-end">
              <Button type="submit" className="mr-2">
                Crear
              </Button>
              <DialogTrigger asChild>
                <Button variant="ghost">Cancelar</Button>
              </DialogTrigger>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CreateCategoryModal;
