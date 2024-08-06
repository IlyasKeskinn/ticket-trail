"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { eventSchema } from "@/lib/validator";
import { useState } from "react";
import { FileUploader } from "./FileUploader";
import { LiaMapMarkerAltSolid } from "react-icons/lia";
import { CiCalendar } from "react-icons/ci";
import { CiLink } from "react-icons/ci";
import { BsCurrencyEuro } from "react-icons/bs";
import { eventDefaultValues } from "@/constants";
import Dropdown from "./Dropdown";
import CountryDropdown from "./CountryDropdown";
import CityDropdown from "./CityDropdown";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { IEvent } from "@/lib/database/models/event.model";

type EventFormProps = {
  type: "Create" | "Update";
  userId: string;
  eventId?: string;
  event?: IEvent;
};

export default function EventForm({
  type,
  userId,
  eventId,
  event,
}: EventFormProps) {
  const initalValues = eventDefaultValues;
  const [files, setFiles] = useState<File[]>([]);
  const [startDate, setStartDate] = useState(new Date());

  const form = useForm<z.infer<typeof eventSchema>>({
    resolver: zodResolver(eventSchema),
    defaultValues: initalValues,
  });
  function onSubmit(values: z.infer<typeof eventSchema>) {
    console.log(values);
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-5"
      >
        <div className="flex md:flex-row flex-col gap-5">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Input
                    placeholder="Event Title"
                    className="input-field"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="categoryId"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Dropdown
                    isCategoryDropdown={true}
                    onChangeHandler={field.onChange}
                    value={field.value}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex md:flex-row flex-col gap-5">
          <FormField
            control={form.control}
            name="desc"
            render={({ field }) => (
              <FormItem className="w-full h-72">
                <FormControl>
                  <Textarea
                    {...field}
                    placeholder="Description"
                    className="textarea rounded-2xl h-full"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem className="w-full bg-white">
                <FormControl className="h-72">
                  <FileUploader
                    onFieldChange={field.onChange}
                    imageUrl={field.value}
                    setFiles={setFiles}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex flex-row  gap-5">
          <FormField
            control={form.control}
            name="countryId"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <CountryDropdown
                    onChangeHandler={field.onChange}
                    value={field.value}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="cityId"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <CityDropdown
                    onChangeHandler={field.onChange}
                    value={field.value}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex flex-col gap-5 md:flex-row">
          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <div className="flex-center h-[54px] w-full overflow-hidden bg-white rounded-full px-4 py-2">
                    <LiaMapMarkerAltSolid />

                    <Input
                      placeholder="Event location or Online"
                      {...field}
                      className="input-field"
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex gap-5">
          <FormField
            control={form.control}
            name="startDateTime"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <div className="flex-center h-[54px] w-full overflow-hidden rounded-full bg-white px-4 py-2">
                    <CiCalendar />
                    <p className="ml-3 whitespace-nowrap bg-white">
                      Start Date:
                    </p>
                    <DatePicker
                      selected={field.value}
                      showTimeSelect
                      onChange={(date: Date | null) => {
                        if (date) {
                          field.onChange(date);
                        }
                      }}
                      timeInputLabel="Time:"
                      dateFormat="MM/dd/yyyy h:mm aa"
                      wrapperClassName="datePicker"
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="endDateTime"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <div className="flex-center h-[54px] w-full overflow-hidden rounded-full bg-white px-4 py-2">
                    <CiCalendar />
                    <p className="ml-3 whitespace-nowrap bg-white">End Date:</p>
                    <DatePicker
                      selected={field.value}
                      onChange={(date: Date | null) => {
                        if (date) {
                          field.onChange(date);
                        }
                      }}
                      showTimeSelect
                      timeInputLabel="Time:"
                      dateFormat="MM/dd/yyyy h:mm aa"
                      wrapperClassName="datePicker"
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex flex-col gap-5 md:flex-row">
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <div className="flex-center h-[54px] w-full overflow-hidden rounded-full bg-white px-4 py-2">
                    <BsCurrencyEuro />
                    <Input
                      type="number"
                      placeholder="Price"
                      {...field}
                      className="p-regular-16 border-0 bg-white outline-offset-0 focus:border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                    />
                    <FormField
                      control={form.control}
                      name="isFree"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <div className="flex items-center">
                              <label
                                htmlFor="isFree"
                                className="whitespace-nowrap pr-3 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                              >
                                Free Ticket
                              </label>
                              <Checkbox
                                onCheckedChange={field.onChange}
                                checked={field.value}
                                id="isFree"
                                className="mr-2 h-5 w-5 border-2 border-primary-500"
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="url"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <div className="flex-center h-[54px] w-full overflow-hidden rounded-full bg-white px-4 py-2">
                    <CiLink />

                    <Input
                      placeholder="URL"
                      {...field}
                      className="input-field"
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button type="submit" className="md:w-fit w-full">
          Submit
        </Button>
      </form>
    </Form>
  );
}
