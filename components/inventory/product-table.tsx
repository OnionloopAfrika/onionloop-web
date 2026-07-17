"use client";

import { Product } from "@/types/inventory/type";
import Image from "next/image";
import {
  DangerIcon,
  DeleteIcon,
  EditIcon,
  MultiplyIcon,
  VerifyIcon,
} from "../icons/svgs";
import Input from "../ui/input";
import Select from "../ui/select";
import { useState, useMemo } from "react";
import { Modal } from "../ui/modal";
import { EditProductForm } from "./edit-product-form";
import Button from "../ui/button";
import { Warning } from "./warning";

type ProductTableProps = {
  products: Product[];
  onProductUpdated?: (updatedProduct: Product) => void;
  onProductDeleted?: (productId: string) => void;
};

export function ProductTable({
  products,
  onProductUpdated,
  onProductDeleted,
}: ProductTableProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [monthFilter, setMonthFilter] = useState("This Month");
  const [openEdit, setOpenEdit] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const [openDelete, setOpenDelete] = useState(false);
  const [deleted, setDeleted] = useState(false);
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);

  const handleDeleted = () => {
    if (productToDelete) {
      onProductDeleted?.(productToDelete.id);
    }
    setOpenDelete(false);
    setDeleted(true);
  };

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase());

      let matchesStatus = true;
      if (statusFilter !== "All") {
        const isLowStock =
          typeof (product.lowStock || 0) === "number" &&
          (product.quantity || 0) <= (product.lowStock || 0);
        const isOutOfStock = (product.quantity || 0) === 0;

        if (statusFilter === "In Stock") {
          matchesStatus = !isLowStock && !isOutOfStock;
        } else if (statusFilter === "Low Stock") {
          matchesStatus = isLowStock;
        } else if (statusFilter === "Out of Stock") {
          matchesStatus = isOutOfStock;
        }
      }

      let matchesMonth = true;
      if (monthFilter !== "This Month") {
        matchesMonth = true;
      }

      return matchesSearch && matchesStatus && matchesMonth;
    });
  }, [products, searchTerm, statusFilter, monthFilter]);

  const handleEditClick = (product: Product) => {
    setSelectedProduct(product);
    setOpenEdit(true);
  };

  return (
    <>
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-[#F9FAFB]">
          <div className="grid grid-cols-1 sm:grid-cols-[2fr_1fr_1fr] gap-3 w-[50%]">
            <div>
              <Input
                placeholder="Search products"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select
              placeholder="All Status"
              value={statusFilter}
              onValueChange={setStatusFilter}
              options={[
                { value: "All", label: "All Status" },
                { value: "In Stock", label: "In Stock" },
                { value: "Low Stock", label: "Low Stock" },
                { value: "Out of Stock", label: "Out of Stock" },
              ]}
            />

            <Select
              placeholder="This Month"
              value={monthFilter}
              onValueChange={setMonthFilter}
              options={[
                { value: "This Month", label: "This Month" },
                { value: "Last Month", label: "Last Month" },
                { value: "This Year", label: "This Year" },
              ]}
            />
          </div>
          <div className="font-[500] text-[16px] text-[#6C6C6C]">
            Showing {filteredProducts.length} products
          </div>
        </div>

        <div className="w-full overflow-x-auto select-none">
          <table className="w-full text-left border-collapse table-auto">
            <thead>
              <tr className="border-y border-gray-50 bg-[#F9FAFB]">
                <th className="px-6 py-4 text-[13px] font-bold text-gray-500 whitespace-nowrap"></th>
                <th className="px-6 py-4 text-[13px] font-bold text-gray-500 whitespace-nowrap">
                  Product Name
                </th>
                <th className="px-6 py-4 text-[13px] font-bold text-gray-500 whitespace-nowrap">
                  Unit(s)
                </th>
                <th className="px-6 py-4 text-[13px] font-bold text-gray-500 whitespace-nowrap">
                  Price (₦)
                </th>
                <th className="px-6 py-4 text-[13px] font-bold text-gray-500 whitespace-nowrap">
                  Stock Qty
                </th>
                <th className="px-6 py-4 text-[13px] font-bold text-gray-500 whitespace-nowrap">
                  Date
                </th>
                <th className="px-6 py-4 text-[13px] font-bold text-gray-500 whitespace-nowrap">
                  Expiration Date
                </th>
                <th className="px-6 py-4 text-[13px] font-bold text-gray-500 whitespace-nowrap"></th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-50">
              {filteredProducts.map((product) => {
                const isLowStock =
                  typeof (product.lowStock || 0) === "number" &&
                  (product.quantity || 0) <= (product.lowStock || 0);
                const isOutOfStock = (product.quantity || 0) === 0;
                const isExpired =
                  product.expiryDate &&
                  new Date(product.expiryDate) < new Date();

                let stockStatus = "In Stock";
                let statusClass =
                  "bg-[#E7F6EC] w-fit py-[4px] px-[12px] rounded-full font-[500] text-[#04802E] text-[14px]";

                if (isOutOfStock) {
                  stockStatus = "Out of Stock";
                  statusClass =
                    "bg-[#FBEAE9] w-fit py-[4px] px-[12px] rounded-full font-[500] text-[#CB1A14] text-[14px]";
                } else if (isLowStock) {
                  stockStatus = "Low Stock";
                  statusClass =
                    "bg-[#FEF6E7] w-fit py-[4px] px-[12px] rounded-full font-[500] text-[#DD900D] text-[14px]";
                }

                return (
                  <tr
                    key={product.id}
                    className="hover:bg-gray-50 transition-colors border-b border-gray-300 cursor-pointer last:border-b-0"
                  >
                    <td className="px-6 py-5 whitespace-nowrap">
                      <div className="w-8 h-8 overflow-hidden rounded-full flex-shrink-0">
                        {product.image ? (
                          <Image
                            src={product.image}
                            alt={product.name}
                            width={32}
                            height={32}
                            className="object-cover"
                          />
                        ) : (
                          <div className="w-full h-full bg-gray-100 flex items-center justify-center text-lg">
                            📦
                          </div>
                        )}
                      </div>
                    </td>

                    <td className="px-6 py-5 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <div>
                          <p className="text-[14px] font-medium text-[#6C6C6C]">
                            {product.name}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-5 whitespace-nowrap text-[14px] text-[#6C6C6C] font-[400]">
                      {product.unit}
                    </td>

                    <td className="px-6 py-5 whitespace-nowrap text-start font-medium text-[#04802E] text-[14px]">
                      +₦{(product.price || 0).toLocaleString()}
                    </td>

                    <td className="px-6 py-5 whitespace-nowrap text-start">
                      <span className={`inline-flex ${statusClass}`}>
                        {stockStatus}
                      </span>
                    </td>

                    <td className="px-6 py-5 whitespace-nowrap text-[14px] text-[#6C6C6C]">
                      {product.createdAt
                        ? new Date(product.createdAt)
                            .toISOString()
                            .split("T")[0]
                        : "N/A"}
                    </td>

                    <td className="px-6 py-5 whitespace-nowrap text-[14px]">
                      <span
                        className={
                          isExpired ? "text-[#CB1A14]" : "text-gray-600"
                        }
                      >
                        {product.expiryDate
                          ? new Date(product.expiryDate).toLocaleDateString(
                              "en-GB",
                              {
                                day: "2-digit",
                                month: "short",
                                year: "numeric",
                              },
                            )
                          : "N/A"}
                      </span>
                    </td>

                    <td className="px-6 py-5 whitespace-nowrap">
                      <div className="flex items-center justify-between gap-4">
                        <button
                          onClick={() => handleEditClick(product)}
                          className="cursor-pointer flex items-center gap-2 text-[#6C6C6C]  transition-colors"
                        >
                          <EditIcon className="w-6 h-6 text-[#04907E]" />
                          <span className="text-[14px] text-[#04907E] font-[500]">
                            Edit
                          </span>
                        </button>
                        <button
                          onClick={() => {
                            setProductToDelete(product);
                            setOpenDelete(true);
                          }}
                          className="cursor-pointer text-red-600 hover:text-red-700 transition-colors"
                        >
                          <DeleteIcon className="w-6 h-6" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            No products match your search or filter criteria
          </div>
        )}
      </div>

      <Modal
        className="max-h-[90%] overflow-scroll"
        open={openEdit}
        onOpenChange={setOpenEdit}
      >
        <EditProductForm
          product={selectedProduct}
          onClose={() => setOpenEdit(false)}
          onProductUpdated={onProductUpdated}
        />
      </Modal>

      <Modal open={openDelete} onOpenChange={setOpenDelete}>
        <div className="w-full space-y-[64px]">
          <div className="space-y-[24px]">
            <DeleteIcon className="mx-auto w-[42.67px] h-[48px] text-danger" />

            <div className="space-y-[12px] text-center">
              <p className="font-[600] text-[24px] text-danger">
                Remove {productToDelete?.name}?
              </p>
              <p className="font-[500] text-[16px] text-[#363636]">
                Are you sure you want to remove this product from your
                inventory?
              </p>
            </div>
          </div>

          <div className="flex items-center gap-[16px]">
            <Button variant="secondary" onClick={() => setOpenDelete(false)}>
              Cancel
            </Button>
            <Button onClick={handleDeleted} variant="danger">
              Remove product
            </Button>
          </div>
        </div>
      </Modal>

      <Modal open={deleted} onOpenChange={setDeleted}>
        <div className="space-y-[64px]">
          <div className="space-y-[40px]">
            <VerifyIcon className="mx-auto text-light" />

            <div className="space-y-[8px] text-center">
              <p className="font-[600] text-[24px] text-light">
                {productToDelete?.name} removed successfully!
              </p>

              <p className="font-[500] text-[16px] text-[#363636]">
                The product has been removed from your inventory
              </p>
            </div>
          </div>

          <div className="flex justify-center w-[362] mx-auto ">
            <Button
              onClick={() => {
                setDeleted(false);
                setProductToDelete(null);
              }}
              size="sm"
            >
              Done
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
}
