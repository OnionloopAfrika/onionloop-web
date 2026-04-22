import React from "react";
import ProfileLayout from "../Shell";
import { ContactSupport } from "@/components/helps-and-support/contact-support";
import { Faq } from "@/components/helps-and-support/faq";
import { SupportHistory } from "@/components/helps-and-support/support-history";

const page = () => {
  return (
    <ProfileLayout
      active="help-and-support"
      heading="Help & Support"
      subheading="Documentation, FAQs, and contact"
    >
      <div className="space-y-[35px]">
        <ContactSupport />
        <Faq />
        <SupportHistory />
      </div>
    </ProfileLayout>
  );
};

export default page;
