import { MailIcon, PhoneIcon } from "@heroicons/react/outline";
import Contact from "../../components/form/Contact";

import { HeaderWithOutCat } from "../../components/Header/HeaderWithOutCat";
export default function page() {
  return (
    <div>
      <HeaderWithOutCat />
      <Contact />
    </div>
  );
}
