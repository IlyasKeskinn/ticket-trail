"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { ICountry } from "@/lib/database/models/country.model";

import { useState } from "react";

interface IDropdownProps {
  value?: string;
  onChangeHandler?: () => void;
  isCategoryDropdown?: boolean;
}
export default function CountryDropdown({
  value,
  onChangeHandler,
}: IDropdownProps) {
  const [countries, setCountries] = useState<ICountry[]>([]);

  return (
    <Select onValueChange={onChangeHandler} defaultValue={value}>
      <SelectTrigger className="select-field">
        <SelectValue placeholder="Country" />
      </SelectTrigger>
      <SelectContent>
        {countries.length > 0 &&
          countries.map((country) => (
            <SelectItem
              key={country._id}
              value={country.name}
              className="select-item py-12"
            >
              {country.name}
            </SelectItem>
          ))}
      </SelectContent>
    </Select>
  );
}
