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
  createWarehouse,
  fetchWarehouses,
} from "@/redux/actions/inventory/warehouseActions";
import { createWarehouseFailure } from "@/redux/slices/inventory/warehouseSlice";
import { RootState, AppDispatch } from "@/redux/store";
import { useToast } from "@/hooks/use-toast";

const CreateWarehouseModal: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [form, setForm] = useState({
    name: "",
    description: "",
  });
  const { toast } = useToast();
  const { status, detailCode, message, errors } = useSelector(
    (state: RootState) => state.warehouse
  );
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleCreateWarehouse = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(createWarehouse(form));
  };

  useEffect(() => {
    if (detailCode === "CREATE_WAREHOUSE_SUCCESS") {
      toast({
        title: "¡Listo!",
        description: message,
      });
      dispatch(fetchWarehouses(1));
      setIsDialogOpen(false);
    } else if (detailCode === "CREATE_WAREHOUSE_VALIDATION_ERROR") {
      toast({
        title: "¡Lo siento!",
        description: message,
      });
    }
  }, [status, message, toast, dispatch]);

  useEffect(() => {
    if (!isDialogOpen) {
      setForm({
        name: "",
        description: "",
      });
      dispatch(
        createWarehouseFailure({ error: null, errors: null, status: null })
      );
    }
  }, [isDialogOpen, dispatch]);

  return (
    <div>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <Button className="mb-4 bg-vibrantCyan">Crear campus</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogTitle>Crear nuevo campus</DialogTitle>
          <DialogDescription>
            Por favor, rellene el formulario para crear un nuevo campus.
          </DialogDescription>
          <form onSubmit={handleCreateWarehouse} className="mt-4">
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

export default CreateWarehouseModal;
