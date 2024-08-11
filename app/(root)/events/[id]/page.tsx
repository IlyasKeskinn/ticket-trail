import CheckoutButton from "@/components/shared/CheckoutButton";
import Collection from "@/components/shared/Collection";
import {
  getEventById,
  getRelatedEventsByCategory,
} from "@/lib/actions/event.actions";
import { IEvent } from "@/lib/database/models/event.model";
import { formatDateTime } from "@/lib/utils";
import { SearchParamProps } from "@/types";
import Image from "next/image";
import { FaCalendarAlt } from "react-icons/fa";
import { LiaMapMarkerAltSolid } from "react-icons/lia";

const EventDetails = async ({
  params: { id },
  searchParams,
}: SearchParamProps) => {
  const event = await getEventById(id);

  const relatedEvents = await getRelatedEventsByCategory({
    categoryId: event.category._id,
    eventId: event._id,
    page: searchParams.page as string,
  });

  return (
    <section className="bg-slate-50 bg-dotted-spacing-9 bg-dotted-slate-200 w-full shadow-sm py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 2xl:max-w-7xl wrapper">
        <div className="md:px-5 py-5 px-0">
          <Image
            alt={event.title}
            src={event.image}
            width={1000}
            height={200}
            className="object-cover object-center h-full min-h-[300px] rounded-lg"
          />
        </div>
        <div className="flex w-full flex-col gap-8 md:px-5 py-5 px-0">
          <div className="flex flex-col gap-6">
            <h5 className="text-3xl font-semibold">{event.title}</h5>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <div className="flex gap-3">
                <p className="text-lg text-center w-24 rounded-full bg-green-400/10 px-4 py-3 text-green-700">
                  {event.isFree ? "Free" : `$${event.price} `}
                </p>
                <p className="text-lg text-center rounded-full bg-slate-400/10 px-4 py-3 text-slate-600">
                  {event.category.name}
                </p>
              </div>
              <p className="p-medium-18 ml-2 mt-2 sm:mt-0">
                by{" "}
                <span className="text-rose-400">
                  {event.organizer.firstName} {event.organizer.lastName}
                </span>
              </p>
            </div>
          </div>
          <CheckoutButton event={event} />

          <div className="flex flex-col gap-5">
            <div className="flex gap-2 md:gap-3">
              <div className="text-sm lg:text-sm flex flex-wrap items-center gap-2">
                <FaCalendarAlt className="text-rose-400" />
                <p>
                  {formatDateTime(event.startDateTime).dateOnly} -{" "}
                  {formatDateTime(event.startDateTime).timeOnly}
                </p>
                <span> / </span>
                <p>
                  {formatDateTime(event.endDateTime).dateOnly} -{" "}
                  {formatDateTime(event.endDateTime).timeOnly}
                </p>
              </div>
            </div>
          </div>
          <div className="text-base flex items-center gap-3">
            <LiaMapMarkerAltSolid className="text-slate-700" />
            <p className="text-sm lg:text-base">{event.location}</p>
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-base text-gray-600">Event Details:</p>
            <p className="text-sm lg:text-base">{event.desc}</p>
            <p className="p-medium-16 lg:p-regular-18 truncate text-primary-500 underline">
              {event.url}
            </p>
          </div>
        </div>
      </div>
      <div className="wrapper md:px-5 py-5 px-0">
        <Collection
          data={relatedEvents?.data}
          emptyTitle="No Events Found"
          emptyStateSubtext="Come back later"
          collectionType="All_Events"
          limit={3}
          page={searchParams.page as string}
          totalPages={relatedEvents?.totalPages}
        />
      </div>
    </section>
  );
};

export default EventDetails;
