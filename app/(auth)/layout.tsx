import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex justify-center items-center bg-dotted-spacing-5 bg-dotted-slate-400">
      <div className="flex flex-col gap-4">
        <Link style={{width  : "100%"}} href="/">
          <Button className="w-full">Back to home</Button>
        </Link>
        {children}
      </div>
    </div>
  );
}
