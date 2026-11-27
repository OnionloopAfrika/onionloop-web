"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { CalendarIcon } from "../icons/svgs";
import { Calendar } from "../ui/calendar";
import Input from "../ui/input";
import { SearchInput } from "../ui/search-input";
import Select from "../ui/select";
import Table, {
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

interface ProfitProduct {
  id: string;
  name: string;
  category: string;
  image: string;
  costPrice: number;
  sellingPrice: number;
  profitMargin: number;
  marginLevel: "high" | "medium" | "low";
  unitsSold: string;
  date: string;
}

const products: ProfitProduct[] = [
  {
    id: "tomatoes-1",
    name: "Organic Tomatoes",
    category: "Vegetables",
    image: "/images/de-light.svg",
    costPrice: 3200,
    sellingPrice: 3200,
    profitMargin: 3200,
    marginLevel: "high",
    unitsSold: "1kg",
    date: "2026-05-08",
  },
  {
    id: "vegetable-oil",
    name: "Vegetable Oil",
    category: "Vegetable Oil",
    image: "/images/grace.svg",
    costPrice: 3200,
    sellingPrice: 3200,
    profitMargin: 3200,
    marginLevel: "high",
    unitsSold: "1kg",
    date: "2026-05-08",
  },
  {
    id: "tomatoes-2",
    name: "Organic Tomatoes",
    category: "Vegetables",
    image: "/images/de-light.svg",
    costPrice: 3200,
    sellingPrice: 3200,
    profitMargin: 3200,
    marginLevel: "high",
    unitsSold: "5L",
    date: "2026-05-08",
  },
  {
    id: "jollof-spice-1",
    name: "Jollof Spice Mix",
    category: "Spices",
    image: "/images/monster.svg",
    costPrice: 3200,
    sellingPrice: 3200,
    profitMargin: 3200,
    marginLevel: "high",
    unitsSold: "100g",
    date: "2026-05-08",
  },
  {
    id: "frozen-fish",
    name: "Frozen Fish",
    category: "Frozen Foods",
    image: "/images/pepsi.svg",
    costPrice: 3200,
    sellingPrice: 3200,
    profitMargin: 3200,
    marginLevel: "high",
    unitsSold: "1kg",
    date: "2026-05-08",
  },
  {
    id: "palm-oil",
    name: "Premium Palm Oil",
    category: "Cooking Oil",
    image: "/images/grace.svg",
    costPrice: 3200,
    sellingPrice: 3200,
    profitMargin: 3200,
    marginLevel: "high",
    unitsSold: "5L",
    date: "2026-05-08",
  },
  {
    id: "plantain-chips-1",
    name: "Plantain Chips",
    category: "Snacks",
    image: "/images/ice-cream.svg",
    costPrice: 15000,
    sellingPrice: 15000,
    profitMargin: 15000,
    marginLevel: "high",
    unitsSold: "200g",
    date: "2026-05-08",
  },
  {
    id: "plantain-chips-2",
    name: "Plantain Chips",
    category: "Snacks",
    image: "/images/ice-cream.svg",
    costPrice: 15000,
    sellingPrice: 15000,
    profitMargin: 15000,
    marginLevel: "high",
    unitsSold: "200g",
    date: "2026-05-08",
  },
  {
    id: "jollof-spice-2",
    name: "Jollof Spice Mix",
    category: "Spices",
    image: "/images/monster.svg",
    costPrice: 7600,
    sellingPrice: 7600,
    profitMargin: 7600,
    marginLevel: "high",
    unitsSold: "100g",
    date: "2026-05-08",
  },
  {
    id: "jollof-spice-3",
    name: "Jollof Spice Mix",
    category: "Spices",
    image: "/images/pepsi.svg",
    costPrice: 7600,
    sellingPrice: 7600,
    profitMargin: 7600,
    marginLevel: "high",
    unitsSold: "100g",
    date: "2026-05-08",
  },
];

const formatNaira = (amount: number) => `₦${amount.toLocaleString("en-NG")}`;

const marginOptions = [
  { value: "all", label: "Profit Margin: All" },
  { value: "high", label: "Profit Margin: High" },
  { value: "medium", label: "Profit Margin: Medium" },
  { value: "low", label: "Profit Margin: Low" },
];

export default function ProfitTable() {
  const [search, setSearch] = useState("");
  const [date, setDate] = useState("2026-05-08");
  const [showCalendar, setShowCalendar] = useState(false);
  const [margin, setMargin] = useState("high");
  const [category, setCategory] = useState("all");
  const selectedDate = useMemo(
    () => (date ? new Date(`${date}T00:00:00`) : undefined),
    [date],
  );

  const categoryOptions = useMemo(
    () => [
      { value: "all", label: "Category: All" },
      ...Array.from(new Set(products.map((product) => product.category))).map(
        (value) => ({ value, label: value }),
      ),
    ],
    [],
  );

  const filteredProducts = useMemo(() => {
    const query = search.trim().toLowerCase();

    return products.filter((product) => {
      const matchesSearch =
        !query ||
        `${product.name} ${product.category}`.toLowerCase().includes(query);
      const matchesDate = !date || product.date === date;
      const matchesMargin = margin === "all" || product.marginLevel === margin;
      const matchesCategory =
        category === "all" || product.category === category;

      return matchesSearch && matchesDate && matchesMargin && matchesCategory;
    });
  }, [category, date, margin, search]);

  return (
    <div className="rounded-[8px] border border-gray-100 bg-white shadow-sm">
      <div className="flex flex-nowrap items-center gap-2 border-b border-gray-100 p-4">
        <div className=" shrink-0">
          <SearchInput
            placeholder="Search products"
            value={search}
            onChange={setSearch}
            categories={[]}
          />
        </div>

        <div className="relative w-[116px] shrink-0">
          <Input
            type="text"
            aria-label="Filter profit by date"
            value={selectedDate?.toLocaleDateString() ?? ""}
            readOnly
            onClick={() => setShowCalendar((isOpen) => !isOpen)}
            className="!border !bg-[#f7f7f7] !border-[#E5E7EB]"
            icon={
              <button
                type="button"
                aria-label="Open profit date calendar"
                aria-expanded={showCalendar}
                onClick={() => setShowCalendar((isOpen) => !isOpen)}
                className="flex items-center text-[#8A8A8A]"
              >
                <CalendarIcon className="h-4 w-4" />
              </button>
            }
          />
          {showCalendar && (
            <div className="absolute left-0 top-full z-50 mt-2">
              <Calendar
                value={selectedDate}
                onChange={(selected) => {
                  const year = selected.getFullYear();
                  const month = String(selected.getMonth() + 1).padStart(
                    2,
                    "0",
                  );
                  const day = String(selected.getDate()).padStart(2, "0");
                  const formattedDate = `${year}-${month}-${day}`;
                  setDate(formattedDate);
                  setShowCalendar(false);
                }}
              />
            </div>
          )}
        </div>

        <div className=" shrink-0">
          <Select
            options={marginOptions}
            value={margin}
            onValueChange={setMargin}
            placeholder="Profit Margin: High"
          />
        </div>

        <div className=" shrink-0">
          <Select
            options={categoryOptions}
            value={category}
            onValueChange={setCategory}
            placeholder="Category: All"
          />
        </div>
      </div>

      <div className="w-full overflow-x-auto">
        <Table style={{ minWidth: "850px" }}>
          <TableHeader>
            <TableRow>
              <TableHead aria-label="Product image" />
              <TableHead>Product Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Cost Price</TableHead>
              <TableHead>Selling Price</TableHead>
              <TableHead>Profit Margin</TableHead>
              <TableHead>Units Sold</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredProducts.map((product) => (
              <TableRow key={product.id}>
                <TableCell>
                  <div className="relative h-8 w-8 overflow-hidden rounded-full">
                    <Image
                      src={product.image}
                      alt=""
                      fill
                      sizes="32px"
                      className="object-cover"
                    />
                  </div>
                </TableCell>
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell>{formatNaira(product.costPrice)}</TableCell>
                <TableCell>{formatNaira(product.sellingPrice)}</TableCell>
                <TableCell>
                  <span className="font-medium text-[#04802E]">
                    {formatNaira(product.profitMargin)}
                  </span>
                </TableCell>
                <TableCell>{product.unitsSold}</TableCell>
              </TableRow>
            ))}
            {filteredProducts.length === 0 && (
              <TableRow>
                <TableCell colSpan={7}>
                  No products match the selected filters.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
