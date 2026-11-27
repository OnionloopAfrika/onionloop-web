import StaffActivityChart, {
  type StaffActivityItem,
} from "@/components/ui/charts/staff-activity-chart";

const staff: StaffActivityItem[] = [
  {
    id: "titi-folarin",
    name: "Titi Folarin",
    role: "Cashier",
    avatar: "/images/joshua.svg",
    status: "online",
  },
  {
    id: "mary-olanrewaju",
    name: "Mary Olanrewaju",
    role: "Manager",
    avatar: "/images/grace.svg",
    status: "online",
    lastSeen: "2hrs",
  },
  {
    id: "david-anigbogu",
    name: "David Anigbogu",
    role: "Head of Staff",
    avatar: "/images/ben.svg",
    status: "offline",
    lastSeen: "3days ago",
  },
  {
    id: "samuel-saidu",
    name: "Samuel Saidu",
    role: "Attendant",
    avatar: "/images/agent.svg",
    status: "online",
  },
  {
    id: "kemi-saidu",
    name: "Kemi Saidu",
    role: "Senior Manager",
    avatar: "/images/tunde.svg",
    status: "online",
    lastSeen: "2hrs",
  },
];

export default function StaffActivity() {
  return (
    <StaffActivityChart staff={staff} manageActivitiesHref="/crew/staffs" />
  );
}
