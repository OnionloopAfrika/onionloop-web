"use client";

import { Product } from "@/types/inventory/type";
import Image from "next/image";
import { DeleteIcon, EditIcon, VerifyIcon } from "../icons/svgs";
import Input from "../ui/input";
import Select from "../ui/select";
import { useState, useMemo } from "react";
import { Modal } from "../ui/modal";
import { EditProductForm } from "./edit-product-form";
import Button from "../ui/button";

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
      const qty = product.quantity || 0;
      const lowStockValue = product.lowStock || 0;

      const matchesSearch =
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase());

      const isOutOfStock = qty === 0;

      const isLowStock = qty > 0 && qty <= lowStockValue;

      let matchesStatus = true;

      if (statusFilter !== "All") {
        if (statusFilter === "In Stock") {
          matchesStatus = !isLowStock && !isOutOfStock;
        } else if (statusFilter === "Low Stock") {
          matchesStatus = isLowStock;
        } else if (statusFilter === "Out of Stock") {
          matchesStatus = isOutOfStock;
        }
      }

      let matchesMonth = true;

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
        <div className="px-6 py-4 border-b  border-gray-100 flex flex-col sm:flex-row space-y-2 space-x-2 items-start sm:items-center justify-between bg-[#F9FAFB]">
          <div className="grid grid-cols-2 sm:grid-cols-[2fr_1fr_1fr] gap-3 w-full">
            <div className="w-full col-span-2 sm:col-span-1">
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

          <div className="font-[500] text-[16px] text-[#6C6C6C] sm:w-full sm:text-end">
            Showing {filteredProducts.length} products
          </div>
        </div>

        <div className="w-full overflow-x-auto select-none">
          <table className="w-full text-left border-collapse table-auto">
            <thead>
              <tr className="border-y border-gray-50 bg-[#F9FAFB]">
                <th className="px-6 py-4"></th>
                <th className="px-6 py-4">Product Name</th>
                <th className="px-6 py-4">Unit(s)</th>
                <th className="px-6 py-4">Price (₦)</th>
                <th className="px-6 py-4">Stock Qty</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Expiration Date</th>
                <th className="px-6 py-4"></th>
              </tr>
            </thead>

            <tbody>
              {filteredProducts.map((product) => {
                const qty = product.quantity || 0;
                const lowStockValue = product.lowStock || 0;

                const isOutOfStock = qty === 0;
                const isLowStock = qty > 0 && qty <= lowStockValue;

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
                  <tr key={product.id} className="hover:bg-gray-50">
                    <td className="px-6 py-5">
                      <div className="w-8 h-8 overflow-hidden rounded-full">
                        {product.image ? (
                          <Image
                            src={product.image}
                            alt={product.name}
                            width={32}
                            height={32}
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            📦
                          </div>
                        )}
                      </div>
                    </td>

                    <td className="px-6 py-5">{product.name}</td>
                    <td className="px-6 py-5">{product.unit}</td>

                    <td className="px-6 py-5 text-[#04802E]">
                      +₦{(product.price || 0).toLocaleString()}
                    </td>

                    <td className="px-6 py-5">
                      <span className={statusClass}>{stockStatus}</span>
                    </td>

                    <td className="px-6 py-5">
                      {product.createdAt
                        ? new Date(product.createdAt)
                            .toISOString()
                            .split("T")[0]
                        : "N/A"}
                    </td>

                    <td className="px-6 py-5">
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

                    <td className="px-6 py-5">
                      <div className="flex gap-4">
                        <button onClick={() => handleEditClick(product)}>
                          <EditIcon className="w-6 h-6 text-[#04907E]" />
                        </button>

                        <button
                          onClick={() => {
                            setProductToDelete(product);
                            setOpenDelete(true);
                          }}
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

      <Modal open={openEdit} onOpenChange={setOpenEdit}>
        <EditProductForm
          product={selectedProduct}
          onClose={() => setOpenEdit(false)}
          onProductUpdated={onProductUpdated}
        />
      </Modal>

      <Modal open={openDelete} onOpenChange={setOpenDelete}>
        <div className="space-y-6 text-center">
          <p>Remove {productToDelete?.name}?</p>

          <div className="flex gap-4 justify-center">
            <Button onClick={() => setOpenDelete(false)}>Cancel</Button>
            <Button onClick={handleDeleted} variant="danger">
              Remove
            </Button>
          </div>
        </div>
      </Modal>

      <Modal open={deleted} onOpenChange={setDeleted}>
        <div className="text-center space-y-4">
          <VerifyIcon className="mx-auto" />
          <p>{productToDelete?.name} removed successfully!</p>

          <Button onClick={() => setDeleted(false)}>Done</Button>
        </div>
      </Modal>
    </>
  );
}
