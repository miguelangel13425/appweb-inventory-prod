import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button, Input } from "@/components/index";
import { RootState } from "@/redux/store";
import { createWarehouse } from "@/redux/actions/inventory/warehouseActions";

const CreateTransactionModal: React.FC = () => {
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    name: "",
    description: "",
  });

  const handleCreateWarehouse = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(createWarehouse(form));
  };

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button className="mb-4 bg-vibrantCyan">Crear transacción</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogTitle>Crear nuevo producto</DialogTitle>
          <DialogDescription>
            Por favor, rellene el formulario para crear un nuevo producto.
          </DialogDescription>
          <div className="mt-4">
            <Input
              placeholder="Nombre"
              onChange={(e: any) => setForm({ ...form, name: e.target.value })}
              className="mb-4"
              required
            />
            <Input
              placeholder="Descripción"
              onChange={(e: any) =>
                setForm({ ...form, description: e.target.value })
              }
              className="mb-4"
              required
            />
            <div className="flex justify-end">
              <Button onClick={handleCreateWarehouse} className="mr-2">
                Crear
              </Button>
              <DialogTrigger asChild>
                <Button variant="ghost">Cancelar</Button>
              </DialogTrigger>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CreateTransactionModal;
