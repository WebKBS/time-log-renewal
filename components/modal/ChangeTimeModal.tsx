import React from "react";
import { Button } from "@/components/ui/button";

import { DialogHeader } from "next/dist/client/components/react-dev-overlay/internal/components/Dialog";
import ChangeTimeForm from "@/components/forms/ChangeTimeForm";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { Record } from "@prisma/client";

interface ChangeTimeModalProps {
  open: boolean;
  setOpen: (value: boolean) => void;
  startTime: string;
  setStartTime: (value: string) => void;
  endTime: string;
  setEndTime: (value: string) => void;
  onSave: (userId: string) => void;
  onDelete: (recordId: number, userId: string) => Promise<void>;
  currentRecord: Record | null;
}

const ChangeTimeModal = ({
  open,
  setOpen,
  startTime,
  setStartTime,
  endTime,
  setEndTime,
  onSave,
  onDelete,
  currentRecord,
}: ChangeTimeModalProps) => {
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader className="text-left">
            <DialogTitle className="mb-2">시간 수정</DialogTitle>
            <DialogDescription>수정할 시간을 입력해주세요.</DialogDescription>
          </DialogHeader>
          <ChangeTimeForm
            startTime={startTime}
            onSetStartTime={setStartTime}
            endTime={endTime}
            setEndTime={setEndTime}
            onSave={onSave}
            onDelete={onDelete}
            currentRecord={currentRecord}
          />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle className="mb-2">시간 수정</DrawerTitle>
          <DrawerDescription>수정할 시간을 입력해주세요.</DrawerDescription>
        </DrawerHeader>
        <div className="px-4">
          <ChangeTimeForm
            startTime={startTime}
            onSetStartTime={setStartTime}
            endTime={endTime}
            setEndTime={setEndTime}
            onSave={onSave}
            onDelete={onDelete}
            currentRecord={currentRecord}
          />
        </div>
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default ChangeTimeModal;
