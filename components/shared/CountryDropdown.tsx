"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getAllCountry } from "@/lib/actions/country.actions";

import { ICountry } from "@/lib/database/models/country.model";

import { Dispatch, SetStateAction, useEffect, useState } from "react";

interface IDropdownProps {
  value?: string;
  onChangeHandler?: (countryId: string) => void;
  isCategoryDropdown?: boolean;
  setCountry: Dispatch<SetStateAction<string>>;
}
export default function CountryDropdown({
  value,
  onChangeHandler,
  setCountry,
}: IDropdownProps) {
  const [countries, setCountries] = useState<ICountry[]>([]);

  useEffect(() => {
    const getCountries = async () => {
      const countryList = await getAllCountry();
      countryList && setCountries(countryList as ICountry[]);
    };

    getCountries();
  }, []);

  const onChancgeCountry = (e: string) => {
    if (onChangeHandler) {
      onChangeHandler(e);
    }
    setCountry(e);
  };

  return (
    <Select
      onValueChange={(e) => {
        onChancgeCountry(e);
      }}
      defaultValue={value}
    >
      <SelectTrigger className="select-field">
        <SelectValue placeholder="Country" />
      </SelectTrigger>
      <SelectContent>
        {countries.length > 0 &&
          countries.map((country) => (
            <SelectItem
              key={country._id}
              value={country._id}
              className="select-item py-12"
            >
              {country.name}
            </SelectItem>
          ))}
      </SelectContent>
    </Select>
  );
}
