import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const AddShortcutDialog = ({ open, setOpen, onAdd }) => {
  const [shortcut, setShortcut] = useState({ label: "", link: "" });

  function isValidUrl(input) {
    const url = input.trim();

    if (!url) {
      return false;
    }

    const urlPattern =
      /^(https?:\/\/)?(www\.)?[a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(\.[a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*\.[a-zA-Z]{2,}(\/.*)?$/;

    const hasHttp = url.startsWith("http://") || url.startsWith("https://");
    const hasWww = url.includes("www.");

    const validFormat = hasHttp || hasWww;

    return urlPattern.test(url) && validFormat;
  }

  const handleAddShortcut = () => {
    if (!shortcut.link) {
      toast.error("Link is required", {
        position: "top-right",
        duration: 3000,
      });
      return;
    }
    if (!shortcut.label) {
      toast.error("Label is required", {
        position: "top-right",
        duration: 3000,
      });
      return;
    }
    // Only allow letters, spaces, and basic punctuation in label
    const labelPattern = /^[\p{L}\p{N}\s.,'"!?:;-]+$/u;
    if (!labelPattern.test(shortcut.label)) {
      toast.error("Label must be text only", {
        position: "top-right",
        duration: 3000,
      });
      return;
    }
    const isValid = isValidUrl(shortcut.link);
    if (isValid) {
      onAdd(shortcut);
    } else {
      toast.error("Invalid URL", {
        position: "top-right",
        duration: 3000,
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-md">
        <DialogTitle>Add Shortcut</DialogTitle>
        <DialogDescription>
          <Input
            id="link"
            defaultValue=""
            placeholder="Enter link"
            onChange={(e) =>
              setShortcut((prev) => ({ ...prev, link: e.target.value.trim() }))
            }
            className="mb-2"
          />
          <Input
            id="label"
            type="text"
            defaultValue=""
            placeholder="Enter label"
            onChange={(e) =>
              setShortcut((prev) => ({ ...prev, label: e.target.value.trim() }))
            }
          />
        </DialogDescription>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button
              type="button"
              className="cursor-pointer"
              onClick={handleAddShortcut}
            >
              Add
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddShortcutDialog;
