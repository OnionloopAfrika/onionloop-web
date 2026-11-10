import { LiveChatIcon, InboxIcon, CallIcon } from "@/components/icons/svgs";
import { ContactGridItem } from "@/types/profile/types";

export const CONTACT_GRID: ContactGridItem[] = [
  {
    icon: LiveChatIcon,
    title: "Live Chat",
    subtitle: "Avg. 3min response",
    url: "/live-chat",
  },

  {
    icon: InboxIcon,
    title: "Email Us",
    subtitle: "Support@onionloop.ng",
    url: "/email-us",
  },

  {
    icon: CallIcon,
    title: "Call Us",
    subtitle: "Mon-Fri, 8am-6pm",
    url: "/call-us",
  },
];
