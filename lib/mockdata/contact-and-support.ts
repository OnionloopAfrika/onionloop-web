import { LiveChatIcon, InboxIcon, CallIcon } from "@/components/icons/svgs";
import { ContactGridItem } from "@/types/profile/types";

export const CONTACT_GRID: ContactGridItem[] = [
  {
    icon: LiveChatIcon,
    title: "Live Chat",
    subtitle: "Avg. 3min response",
  },

  {
    icon: InboxIcon,
    title: "Email Us",
    subtitle: "Support@onionloop.ng",
  },

  {
    icon: CallIcon,
    title: "Call Us",
    subtitle: "Mon-Fri, 8am-6pm",
  },
];
