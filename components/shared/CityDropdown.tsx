"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getCitiesByCountryId } from "@/lib/actions/city.actions";

import { ICity } from "@/lib/database/models/city.model";
import { useEffect, useState } from "react";

interface IDropdownProps {
  value?: string;
  onChangeHandler?: () => void;
  isCategoryDropdown?: boolean;
  countryId?: string;
}
export default function CityDropdown({
  value,
  onChangeHandler,
  countryId,
}: IDropdownProps) {
  const [cities, setCities] = useState<ICity[]>([]);

  useEffect(() => {
    const getCities = async () => {
      const cityList = await getCitiesByCountryId({ country: countryId! });
      cityList && setCities(cityList as ICity[]);
    };

    getCities();
  }, [countryId]);

  return (
    <Select
      disabled={!countryId}
      onValueChange={onChangeHandler}
      defaultValue={value}
    >
      <SelectTrigger className="select-field">
        <SelectValue placeholder="City" />
      </SelectTrigger>
      <SelectContent>
        {cities.length > 0 &&
          cities.map((city) => (
            <SelectItem
              key={city._id}
              value={city._id}
              className="select-item py-12"
            >
              {city.name}
            </SelectItem>
          ))}
      </SelectContent>
    </Select>
  );
}
