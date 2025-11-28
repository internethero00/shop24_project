import styles from "./HeaderMenu.module.css";

import { MobileMenu } from "@/components/layouts/main-layout/header/header-menu/mobileMenu/MobileMenu";
import { HeaderItems } from "@/components/layouts/main-layout/header/header-menu/HeaderItems";

export function HeaderMenu() {
  return (
    <>
      <div className={styles.mobile_menu}>
        <MobileMenu/>
      </div>
      <div className={styles.header_menu}>
        <HeaderItems />
      </div>
    </>
  );
}
