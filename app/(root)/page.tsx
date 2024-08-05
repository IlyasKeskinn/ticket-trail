import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
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
              <Button className="w-32 py-7 px-20">Explore Events</Button>
            </Link>
          </div>
          <div className="md:w-1/2 w-full">
            <Image alt="hero" src={"/hero.png"} width={500} height={400} />
          </div>
        </div>
      </div>
    </main>
  );
}
