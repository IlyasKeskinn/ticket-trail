"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { ICategory } from "@/lib/database/models/category.model";
import { startTransition, useState } from "react";
import { Input } from "../ui/input";

interface IDropdownProps {
  value?: string;
  onChangeHandler?: () => void;
  isCategoryDropdown?: boolean;
}
export default function Dropdown({
  value,
  onChangeHandler,
  isCategoryDropdown,
}: IDropdownProps) {
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [newCategory, setNewCategory] = useState("");

  const handleAddCategory = () => {
    console.log(newCategory);
  };
  return (
    <Select
      onValueChange={onChangeHandler}
      defaultValue={value}
    >
      <SelectTrigger className="select-field">
        <SelectValue placeholder="Category" />
      </SelectTrigger>
      <SelectContent>
        {categories.length > 0 &&
          categories.map((category) => (
            <SelectItem
              key={category._id}
              value={category.name}
              className="select-item py-12"
            >
              {category.name}
            </SelectItem>
          ))}
        {isCategoryDropdown && (
          <AlertDialog>
            <AlertDialogTrigger className="w-full pl-8 py-2 text-sm text-start cursor-pointer hover:bg-slate-200 rounded-md text-slate-900">
              Add Category
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Add a new category</AlertDialogTitle>
                <AlertDialogDescription>
                  <Input
                    type="text"
                    placeholder="Category name"
                    className="input-field mt-3 bg-stone-100"
                    onChange={(e) => setNewCategory(e.target.value)}
                  />
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => startTransition(handleAddCategory)}
                >
                  Add
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        )}
      </SelectContent>
    </Select>
  );
}
