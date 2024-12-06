import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { AlignJustify, Apple } from "lucide-react";
import Link from "next/link";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

export default function MainMobileNavbar() {
  return (
    <div className="md:hidden">
      <Sheet>
        <SheetTrigger>
          <AlignJustify />
        </SheetTrigger>
        <VisuallyHidden>
          <SheetHeader>
            <SheetTitle>Nav</SheetTitle>
            <SheetDescription>Nav</SheetDescription>
          </SheetHeader>
        </VisuallyHidden>

        <SheetContent side="left">
          <Link href="/">
            <Apple className="text-red-500" />
          </Link>
          <nav className="flex flex-col gap-3 lg:gap-4 mt-6">
            <Link href="/project">Project</Link>
            <Link href="/about">About</Link>
            <Link href="/contact">Contact</Link>
          </nav>
        </SheetContent>
      </Sheet>
    </div>
  );
}
