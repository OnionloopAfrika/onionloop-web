import Table, { TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Badge from "../ui/badge";

const sentNotifications = [
  {
    recipient: "Amina Yusuf",
    type: "KYC Rejected",
    channel: "In-app + Email",
    content:
      "Your KYC verification was unsuccessful. Please review your details and resubmit your documents.",
    sent: "Today 5:48am",
    status: "Active",
  },
  {
    recipient: "Ibrahim Musa",
    type: "KYC Approved",
    channel: "In-app + Email",
    content:
      "Your account is verified- you can now send, receive, and scan to pay.",
    sent: "Today 6:15am",
    status: "Active",
  },
  {
    recipient: "Chinedu Okafor",
    type: "Account Suspended",
    channel: "In-app + Email",
    content:
      "Your account has been suspended. Please contact support for more information.",
    sent: "Today 4:30am",
    status: "Active",
  },
  {
    recipient: "Fatima Bello",
    type: "KYC On Hold",
    channel: "In-app + Email",
    content:
      "Your KYC verification is on hold while we review the additional information provided.",
    sent: "Today 3:42am",
    status: "Active",
  },
  {
    recipient: "Kwame Mensah",
    type: "Float Top-up Approved",
    channel: "In-app",
    content:
      "Your float top-up has been approved and is now available in your account.",
    sent: "Today 2:18am",
    status: "Pending",
  },
];

interface SentAllProps {
  notificationType?: string;
}

export default function SentAll({ notificationType = "All" }: SentAllProps) {
  const notifications =
    notificationType === "All"
      ? sentNotifications
      : sentNotifications.filter(
          (notification) => notification.type === notificationType,
        );

  return (
    <section
      aria-label={`${notificationType} sent notifications`}
      className="w-full overflow-hidden border-y border-[#D6D6D6] bg-white"
    >
      <div className="w-full overflow-x-auto">
        <Table>
          <colgroup>
            <col className="w-[14%]" />
            <col className="w-[16%]" />
            <col className="w-[12%]" />
            <col className="w-[28%]" />
            <col className="w-[17%]" />
            <col className="w-[13%]" />
          </colgroup>
          <TableHeader>
            <TableRow>
              <TableHead scope="col">
                To
              </TableHead>
              <TableHead scope="col">
                Type
              </TableHead>
              <TableHead scope="col">
                Channel
              </TableHead>
              <TableHead scope="col">
                Content
              </TableHead>
              <TableHead scope="col">
                Sent
              </TableHead>
              <TableHead scope="col">
                Status
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {notifications.map((notification) => (
              <TableRow
                key={notification.recipient}
              >
                <TableCell>
                  {notification.recipient}
                </TableCell>
                <TableCell>{notification.type}</TableCell>
                <TableCell>{notification.channel}</TableCell>
                <TableCell>
                  {notification.content}
                </TableCell>
                <TableCell>
                  {notification.sent}
                </TableCell>
                <TableCell>
                  <Badge
                    variant={
                      notification.status === "Pending" ? "pending" : "active"
                    }
                  >
                    {notification.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </section>
  );
}
