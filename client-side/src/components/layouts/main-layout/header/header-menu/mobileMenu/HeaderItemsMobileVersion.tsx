"use client";
import { HeaderCart } from "@/components/layouts/main-layout/header/header-menu/header-cart/HeaderCart";
import { LogOut } from "lucide-react";
import { SearchInput } from "@/components/layouts/main-layout/header/search-input/SearchInput";
import { useProfile } from "@/hooks/useProfile";
import { Loader } from "@/components/ui/Loader";
import { DASHBOARD_URL, PUBLIC_URL, STORE_URL } from "@/config/url.config";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import styles from "./MobileMenu.module.css";
import { SheetClose } from "@/components/ui/Sheet";
import { CreateStoreModal } from "@/components/ui/modals/CreateStoreModal";

type HeaderItemsMobileVersionProps = {
    onClose?: () => void;
};

export function HeaderItemsMobileVersion({ onClose }: HeaderItemsMobileVersionProps) {
  const { user, isLoading } = useProfile();

  return (
    <div className="mt-10">
      <div className={styles.header}>
        <SearchInput onSearchEnd={onClose}/>
        {isLoading ? (
          <Loader size="sm" />
        ) : user ? (
          <SheetClose asChild>
            <Link href={DASHBOARD_URL.home()}>
              <Image
                src={user.picture}
                alt={user.name}
                width={42}
                height={42}
                className={styles.avatar}
              />
            </Link>
          </SheetClose>
        ) : (
          <SheetClose asChild>
            <Link href={PUBLIC_URL.auth()}>
              <Button variant="primary">
                <LogOut className={styles.icon} />
                Log in
              </Button>
            </Link>
          </SheetClose>
        )}
      </div>
      <div className={styles.main}>
        <SheetClose asChild>
          <HeaderCart />
        </SheetClose>
        <SheetClose asChild>
          <Link href={PUBLIC_URL.explorer()}>
            <Button variant="ghost">Catalogs</Button>
          </Link>
        </SheetClose>
        {user && (
          <SheetClose asChild>
            <Link href={DASHBOARD_URL.favorites()}>
              <Button variant="ghost">Favorites</Button>
            </Link>
          </SheetClose>
        )}

        {user && user.stores.length ? (
          <SheetClose asChild>
            <Link href={STORE_URL.home(user.stores[0].id)}>
              <Button variant="ghost">My Stores</Button>
            </Link>
          </SheetClose>
        ) : (
          <SheetClose asChild>
            <CreateStoreModal>
              <Button variant="ghost">To create store</Button>
            </CreateStoreModal>
          </SheetClose>
        )}
      </div>
    </div>
  );
}
