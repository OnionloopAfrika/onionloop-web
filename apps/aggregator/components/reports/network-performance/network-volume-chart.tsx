import ReportVolumeChart from "../report-volume-chart";

const WEEKLY_VOLUME = [
  { day: "Mon", volume: 60 },
  { day: "Tue", volume: 75 },
  { day: "Wed", volume: 64 },
  { day: "Thu", volume: 78 },
  { day: "Fri", volume: 65 },
  { day: "Sat", volume: 92 },
  { day: "Sun", volume: 100 },
];

export default function NetworkVolumeChart() {
  return (
    <ReportVolumeChart title="Weekly volume (₦ millions)" data={WEEKLY_VOLUME} />
  );
}
