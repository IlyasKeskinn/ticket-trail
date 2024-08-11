import CategoryFilter from "@/components/shared/CategoryFilter";
import Collection from "@/components/shared/Collection";
import { Button } from "@/components/ui/button";
import { getAllEvents } from "@/lib/actions/event.actions";
import { SearchParamProps } from "@/types";
import { Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default async function Home({ searchParams }: SearchParamProps) {
  const page = Number(searchParams?.page) || 1;
  const searchText = (searchParams?.query as string) || "";
  const category = (searchParams?.category as string) || "";

  const events = await getAllEvents({
    query: searchText,
    category,
    page,
    limit: 6,
  });

  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <div className="bg-slate-50 bg-dotted-spacing-9 bg-dotted-slate-200 w-full shadow-sm">
        <div className="wrapper md:flex-row flex flex-col">
          <div id="hero_desc" className="flex flex-col md:w-1/2 w-full p-5">
            <h3 className="lg:text-7xl  md:text-5xl text-4xl font-bold">
              Bring Your Events to Life
            </h3>
            <p className="text-lg font-light py-12">
              From the thrill of live theater and the energy of concerts to the
              elegance of gallery exhibitions and the humor of stand-up comedy,
              explore and secure your tickets for a wide range of unforgettable
              events all in one convenient place.
            </p>
            <Link href={"#events"}>
              <Button className="py-7 px-20 w-full sm:w-fit">
                Explore Events
              </Button>
            </Link>
          </div>
          <div className="md:w-1/2 w-full md:flex items-center justify-center">
            <Image
              alt="hero"
              src={"/hero.png"}
              className="object-cover object-center max-h-[70vh] 2xl:max-h-[50vh]:"
              width={500}
              height={400}
            />
          </div>
        </div>
      </div>
      <section
        id="events"
        className="wrapper my-8 flex flex-col gap-8 md:gap-12"
      >
        <h2 className="h2-bold">
          Trust by <br /> Thousands of Events
        </h2>

        <div className="flex w-full flex-col gap-5 md:flex-row">
          <Search />
          <CategoryFilter />
        </div>

        <Collection
          data={events?.data}
          emptyTitle="No Events Found"
          emptyStateSubtext="Come back later"
          collectionType="All_Events"
          limit={6}
          page={page}
          totalPages={events?.totalPages}
        />
      </section>
    </main>
  );
}
