import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RootState } from "../../../../redux/store";

const CreateWarehouseModal: React.FC = () => {
  //const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  //const { loading } = useSelector((state: RootState) => state.warehouseReducer);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="btn btn-primary">Create Warehouse</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Create Warehouse</DialogTitle>
        <DialogDescription>Create a new Warehouse</DialogDescription>
        <div className="grid gap-4 py-4">
          <Input placeholder="Warehouse" />
          <div className="flex justify-end">
            <Button className="btn btn-primary">Create</Button>
            <DialogTrigger asChild>
              <Button className="btn btn-secondary">Cancel</Button>
            </DialogTrigger>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreateWarehouseModal;
