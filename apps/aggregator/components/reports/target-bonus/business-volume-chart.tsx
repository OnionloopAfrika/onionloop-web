import ReportVolumeChart from "../report-volume-chart";

const DAILY_VOLUME = [
  { day: "Mon", volume: 60 },
  { day: "Tue", volume: 74 },
  { day: "Wed", volume: 63 },
  { day: "Thu", volume: 78 },
  { day: "Fri", volume: 64 },
  { day: "Sat", volume: 92 },
  { day: "Sun", volume: 100 },
];

export default function BusinessVolumeChart() {
  return (
    <ReportVolumeChart
      title="Daily business volume (₦ millions)"
      data={DAILY_VOLUME}
    />
  );
}
