import Table, {
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const WEEKLY_GROWTH_ROWS = [
  {
    week: "Wk 1",
    newBusinesses: "3",
    total: "134",
    active: "104",
    dormant: "28",
  },
  {
    week: "Wk 2",
    newBusinesses: "5",
    total: "139",
    active: "107",
    dormant: "27",
  },
  {
    week: "Wk 3",
    newBusinesses: "4",
    total: "143",
    active: "110",
    dormant: "26",
  },
  {
    week: "Wk 4",
    newBusinesses: "5",
    total: "148",
    active: "120",
    dormant: "26",
  },
];

export default function NetworkGrowthTable() {
  return (
    <section>
      <h3 className="border-b border-[#E5E7EB] px-[16px] py-[14px] text-[12px] font-[600] text-[#04907E]">
        NETWORK GROWTH BY WEEK
      </h3>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Week</TableHead>
              <TableHead>New</TableHead>
              <TableHead>Total at Close</TableHead>
              <TableHead>Active</TableHead>
              <TableHead>Dormant</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {WEEKLY_GROWTH_ROWS.map((row) => (
              <TableRow key={row.week}>
                <TableCell>{row.week}</TableCell>
                <TableCell>{row.newBusinesses}</TableCell>
                <TableCell>{row.total}</TableCell>
                <TableCell>{row.active}</TableCell>
                <TableCell>{row.dormant}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </section>
  );
}
