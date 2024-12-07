"use client";

import { CircleUser } from "lucide-react";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { usePathname, useRouter } from "next/navigation";
import { useUser } from "@/context/user.provider";
import { logout } from "@/services/AuthService";
import { protectedRoutes } from "@/constant";
import Link from "next/link";

const NavbarUser = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { user, setIsLoading: setUserLoading } = useUser();
  let dashboardUrl = "";

  const handleLogout = () => {
    logout();
    setUserLoading(true);

    if (protectedRoutes.some((route) => pathname.match(route))) {
      router.push("/");
    }
  };

  if (!user) {
    return (
      <Button variant="secondary" onClick={() => router.push("/login")}>
        Login
      </Button>
    );
  }

  switch (user?.role) {
    case "admin":
      dashboardUrl = "/admin-dashboard";
      break;
    case "user":
      dashboardUrl = "/user-dashboard";
      break;
    case "vendor":
      dashboardUrl = "/vendor-dashboard";
      break;

    default:
      break;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="secondary" size="icon" className="rounded-full">
          {user.profilePicture ? (
            <Image
              src={user.profilePicture}
              alt="Profile Picture"
              width={36}
              height={36}
              className="rounded-full border-2 border-emerald-500"
            />
          ) : (
            <CircleUser className="h-5 w-5" />
          )}
          <span className="sr-only">Toggle user menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>{user.name}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Link href={dashboardUrl}>Dashboard</Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Button onClick={handleLogout} className="w-full">
            Logout
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NavbarUser;
