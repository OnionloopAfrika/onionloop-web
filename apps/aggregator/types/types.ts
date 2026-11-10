export interface LocationItem {
id: string;
group: string;
name: string;
manager: string;
revenue: string;
trend: string;
isTrendUp: boolean;
transactions: number;
perfScore: number;
status: "Healthy" | "Warning" | "Critical";
}