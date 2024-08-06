"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { ICity } from "@/lib/database/models/city.model";
import { useState } from "react";

interface IDropdownProps {
  value?: string;
  onChangeHandler?: () => void;
  isCategoryDropdown?: boolean;
}
export default function CityDropdown({
  value,
  onChangeHandler,
}: IDropdownProps) {
  const [cities, setCities] = useState<ICity[]>([]);

  return (
    <Select onValueChange={onChangeHandler} defaultValue={value}>
      <SelectTrigger className="select-field">
        <SelectValue placeholder="City" />
      </SelectTrigger>
      <SelectContent>
        {cities.length > 0 &&
          cities.map((city) => (
            <SelectItem
              key={city._id}
              value={city.name}
              className="select-item py-12"
            >
              {city.name}
            </SelectItem>
          ))}
      </SelectContent>
    </Select>
  );
}
