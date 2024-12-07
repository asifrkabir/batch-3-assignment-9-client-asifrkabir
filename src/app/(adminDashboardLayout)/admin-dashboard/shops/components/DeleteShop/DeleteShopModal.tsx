"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { useState } from "react";
import DeleteShopDropdownItem from "./DeleteShopDropdownItem";
import DeleteShopForm from "./DeleteShopForm";

interface IProps {
  id: string;
}

export function DeleteShopModal({ id }: IProps) {
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <DeleteShopDropdownItem />
      </DialogTrigger>
      <DialogContent className={"lg:max-w-screen-lg"}>
        <DialogHeader>
          <DialogTitle>Delete Shop</DialogTitle>
          <VisuallyHidden>
            <DialogDescription>Delete Shop Details</DialogDescription>
          </VisuallyHidden>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <DeleteShopForm id={id} closeModal={handleClose} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
