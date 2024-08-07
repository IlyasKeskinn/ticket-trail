
import EventForm from "@/components/shared/EventForm";
import { auth } from "@clerk/nextjs/server";

interface IUser {
  userId : string
}

const CreateEvents = () => {
  const { sessionClaims } = auth();

  const user : any = sessionClaims?.userId ;
  let userId ;
  if (user) {
    userId = user.userId
  }
  return (
    <main>
      <section className="bg-slate-50 bg-dotted-spacing-9 bg-dotted-slate-200 w-full shadow-sm">
        <div className="min-h-screen flex flex-col items-center gap-5">
          <div className="wrapper flex justify-center">
            <h4 className="text-3xl font-semibold p-6">Create Event</h4>
          </div>
          <div className="wrapper"><EventForm userId={userId} type="Create" /></div>
        </div>
      </section>
    </main>
  );
};

export default CreateEvents;
