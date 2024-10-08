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
import { useEffect, useState } from "react";
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
import { useUploadThing } from "@/lib/uploadthing";
import { createEvent, updateEvent } from "@/lib/actions/event.actions";
import { useRouter } from "next/navigation";

type EventFormProps = {
  userId: string;
  type: "Create" | "Update";
  event?: IEvent;
  eventId?: string;
};

export default function EventForm({
  type,
  userId,
  eventId,
  event,
}: EventFormProps) {
  const initialValues =
    event && type === "Update"
      ? {
          ...event,
          startDateTime: new Date(event.startDateTime),
          endDateTime: new Date(event.endDateTime),
        }
      : eventDefaultValues; 
  const [files, setFiles] = useState<File[]>([]);
  const [country, setCountry] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (type === "Update") {
      setCountry(event?.country._id!);
    }
  }, [event]);

  const { startUpload } = useUploadThing("imageUploader");

  const form = useForm<z.infer<typeof eventSchema>>({
    resolver: zodResolver(eventSchema),
    defaultValues: initialValues,
  });

  async function onSubmit(values: z.infer<typeof eventSchema>) {
    let uploadImageUrl = values.image;

    if (files.length > 0) {
      const uploadedImages = await startUpload(files);

      if (!uploadedImages) {
        return;
      }

      uploadImageUrl = uploadedImages[0].url;
    }

    if (type === "Create") {
      try {
        const newEvent = await createEvent({
          userId,
          event: { ...values, image: uploadImageUrl },
          path: "/profile",
        });

        if (newEvent) {
          form.reset();
          router.push(`/events/${newEvent._id}`);
        }
      } catch (error) {
        console.log(error);
      }
    }

    if (type === "Update") {
      if (!eventId) {
        router.back();
        return;
      }

      try {
        const updatedEvent = await updateEvent({
          userId,
          event: { ...values, image: uploadImageUrl, _id: eventId },
          path: `/events/${eventId}`,
        });

        if (updatedEvent) {
          form.reset();
          router.push(`/events/${updatedEvent._id}`);
        }
      } catch (error) {
        console.log(error);
      }
    }
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
                    setCountry={setCountry}
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
                    countryId={country}
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

        <Button
          type="submit"
          className="md:w-fit w-full"
          disabled={form.formState.isSubmitting}
        >
          {type} Event
        </Button>
      </form>
    </Form>
  );
}
