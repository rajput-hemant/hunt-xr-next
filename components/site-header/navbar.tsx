import Image from "next/image";
import Link from "next/link";

import { siteConfig } from "~/config/site";
import { auth } from "~/lib/auth";

import Button from "../ui/button";
import If from "../ui/if";
import { Header } from "./header";
import { LogOutButton } from "./logout-button";

export async function Navbar() {
  const user = await auth();

  return (
    <Header>
      <div className="relative flex w-full items-center justify-between rounded-full py-2">
        <div className="flex w-full items-center gap-2">
          <div className="flex aspect-square size-14 items-center justify-center overflow-hidden rounded-full border border-foreground">
            <Image
              src="/logo-sm.png"
              width={100}
              height={100}
              alt={`${siteConfig.name} logo`}
            />
          </div>

          <Link
            href="/"
            className="text-lg font-semibold sm:text-xl md:text-2xl"
          >
            Hunt XR
          </Link>
        </div>

        <nav className="hidden w-full items-center justify-end gap-2 md:flex">
          <If
            condition={user}
            fallback={
              <Button href="/login" round size="lg">
                <span>Login</span>
              </Button>
            }
          >
            <LogOutButton />
          </If>
        </nav>
      </div>
    </Header>
  );
}