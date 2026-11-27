"use client";

import { Product } from "@/types/inventory/type";
import Image from "next/image";
import { CalendarIcon, DeleteIcon, EditIcon, VerifyIcon } from "../icons/svgs";
import Input from "../ui/input";
import Select from "../ui/select";
import { useState, useMemo } from "react";
import { Calendar } from "../ui/calendar";
import { Modal } from "../ui/modal";
import { EditProductForm } from "./edit-product-form";
import Button from "../ui/button";
import { SearchInput } from "../ui/search-input";
import Pagination from "../ui/pagination";
import Table, {
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

const pageSize = 10;

const formatPrice = (price: number) => `₦${price.toLocaleString("en-NG")}`;

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
  const [expiryDateFilter, setExpiryDateFilter] = useState("");
  const [showCalendar, setShowCalendar] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [openEdit, setOpenEdit] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const [openDelete, setOpenDelete] = useState(false);
  const [deleted, setDeleted] = useState(false);
  const [productUpdated, setProductUpdated] = useState(false);
  const [updatedProductName, setUpdatedProductName] = useState("");
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);

  const selectedExpiryDate = expiryDateFilter
    ? new Date(`${expiryDateFilter}T00:00:00`)
    : undefined;

  const handleProductUpdated = (updatedProduct: Product) => {
    onProductUpdated?.(updatedProduct);
    setUpdatedProductName(updatedProduct.name);
    setOpenEdit(false);
    setProductUpdated(true);
  };

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
      const query = searchTerm.trim().toLowerCase();
      const expiryDate = product.expiryDate?.slice(0, 10) ?? "";

      const matchesSearch =
        product.name.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query);
      const matchesDate =
        !expiryDateFilter ||
        Boolean(expiryDate && expiryDate >= expiryDateFilter);

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

      return matchesSearch && matchesStatus && matchesDate;
    });
  }, [products, searchTerm, statusFilter, expiryDateFilter]);

  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / pageSize));
  const visiblePage = Math.min(currentPage, totalPages);
  const paginatedProducts = useMemo(
    () =>
      filteredProducts.slice(
        (visiblePage - 1) * pageSize,
        visiblePage * pageSize,
      ),
    [filteredProducts, visiblePage],
  );

  const handleEditClick = (product: Product) => {
    setSelectedProduct(product);
    setOpenEdit(true);
  };

  return (
    <>
      <div className="space-y-4">
        <div className="overflow-hidden rounded-[8px] border border-gray-100 bg-white shadow-sm">
          <div className="flex flex-wrap items-center gap-2 border-b border-gray-100 p-4">
            <div className="">
              <SearchInput
                placeholder="Search products"
                value={searchTerm}
                onChange={(value) => {
                  setSearchTerm(value);
                  setCurrentPage(1);
                }}
                categories={[]}
              />
            </div>

            <div className="relative w-full sm:w-[132px]">
              <Input
                className="!h-12 !w-full !border !border-[#E5E7EB] !bg-[#f7f7f7] !pr-12"
                type="text"
                aria-label="Filter products by expiration date"
                value={selectedExpiryDate?.toLocaleDateString() ?? ""}
                readOnly
                onClick={() => setShowCalendar((isOpen) => !isOpen)}
                icon={
                  <button
                    type="button"
                    aria-label="Open expiration date calendar"
                    aria-expanded={showCalendar}
                    onClick={() => setShowCalendar((isOpen) => !isOpen)}
                    className="flex items-center text-[#8A8A8A]"
                  >
                    <CalendarIcon className="h-5 w-5" />
                  </button>
                }
              />
              {showCalendar && (
                <div className="absolute left-0 top-full z-50 mt-2 sm:left-auto sm:right-0">
                  <Calendar
                    value={selectedExpiryDate}
                    onChange={(date) => {
                      const year = date.getFullYear();
                      const month = String(date.getMonth() + 1).padStart(
                        2,
                        "0",
                      );
                      const day = String(date.getDate()).padStart(2, "0");
                      setExpiryDateFilter(`${year}-${month}-${day}`);
                      setCurrentPage(1);
                      setShowCalendar(false);
                    }}
                  />
                </div>
              )}
            </div>

            <div className="w-full sm:w-[128px]">
              <Select
                placeholder="Status: All"
                value={statusFilter}
                onValueChange={(value) => {
                  setStatusFilter(value);
                  setCurrentPage(1);
                }}
                options={[
                  { value: "All", label: "Status: All" },
                  { value: "In Stock", label: "In Stock" },
                  { value: "Low Stock", label: "Low Stock" },
                  { value: "Out of Stock", label: "Out of Stock" },
                ]}
              />
            </div>
          </div>

          <div className="w-full overflow-x-auto">
            <Table style={{ minWidth: "1000px" }}>
              <TableHeader>
                <TableRow>
                  <TableHead aria-label="Product image" />
                  <TableHead>Product Name</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Unit(s)</TableHead>
                  <TableHead>Cost Price</TableHead>
                  <TableHead>Selling Price</TableHead>
                  <TableHead>Stock Qty</TableHead>
                  <TableHead>Expiration Date</TableHead>
                  <TableHead aria-label="Actions" />
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedProducts.map((product) => {
                  const expiryDate = product.expiryDate?.slice(0, 10);
                  const expiry = expiryDate
                    ? new Date(`${expiryDate}T00:00:00`)
                    : null;
                  const today = new Date();
                  today.setHours(0, 0, 0, 0);
                  const daysUntilExpiry = expiry
                    ? Math.ceil(
                        (expiry.getTime() - today.getTime()) / 86_400_000,
                      )
                    : null;
                  const expiryClass =
                    daysUntilExpiry === null
                      ? "text-gray-600"
                      : daysUntilExpiry < 0
                        ? "text-[#CB1A14]"
                        : daysUntilExpiry <= 90
                          ? "text-[#DD900D]"
                          : "text-gray-600";

                  return (
                    <TableRow key={product.id}>
                      <TableCell>
                        <div className="relative h-8 w-8 overflow-hidden rounded-full">
                          {product.image ? (
                            <Image
                              src={product.image}
                              alt={product.name}
                              fill
                              sizes="32px"
                              unoptimized
                              className="object-cover"
                            />
                          ) : (
                            <div className="flex h-full w-full items-center justify-center">
                              📦
                            </div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>{product.name}</TableCell>
                      <TableCell>{product.category}</TableCell>
                      <TableCell>{product.unit}</TableCell>
                      <TableCell>
                        {product.costPrice === undefined
                          ? "—"
                          : formatPrice(product.costPrice)}
                      </TableCell>
                      <TableCell>{formatPrice(product.price)}</TableCell>
                      <TableCell>{product.quantity}</TableCell>
                      <TableCell>
                        <span className={expiryClass}>
                          {expiry
                            ? expiry.toLocaleDateString("en-GB", {
                                day: "2-digit",
                                month: "long",
                                year: "numeric",
                              })
                            : "N/A"}
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-[42px]">
                          <button
                            type="button"
                            aria-label={`Edit ${product.name}`}
                            onClick={() => handleEditClick(product)}
                            className="flex items-center gap-[12px] text-[#04907E]"
                          >
                            <EditIcon className="h-[20px] w-[20px]" />
                            <span className="font-[500] text-[14px]">Edit</span>
                          </button>
                          <button
                            type="button"
                            aria-label={`Delete ${product.name}`}
                            onClick={() => {
                              setProductToDelete(product);
                              setOpenDelete(true);
                            }}
                          >
                            <DeleteIcon className="h-[24px] w-[24px] text-[#CB1A14]" />
                          </button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
                {filteredProducts.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={9} style={{ textAlign: "center" }}>
                      No products match your search or filter criteria.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>

        <Pagination
          currentPage={visiblePage}
          pageSize={pageSize}
          totalItems={filteredProducts.length}
          itemLabel="products"
          onPageChange={setCurrentPage}
        />
      </div>

      <Modal open={openEdit} onOpenChange={setOpenEdit}>
        <EditProductForm
          key={selectedProduct?.id ?? "no-product"}
          product={selectedProduct}
          onClose={() => setOpenEdit(false)}
          onProductUpdated={handleProductUpdated}
        />
      </Modal>

      <Modal open={productUpdated} onOpenChange={setProductUpdated}>
        <div className="space-y-[64px] text-center">
          <div className="space-y-[24px]">
            <VerifyIcon className="mx-auto" color="#04907E" />
            <div className="mx-auto space-y-[8px]">
              <p className="font-[600] text-[24px] text-[#04907E]">
                {updatedProductName} updated successfully!
              </p>

              <p className="font-[500] text-[16px] text-[#363636]">
                The product has been updated in your inventory
              </p>
            </div>
          </div>

          <Button
            className="max-w-[362px]"
            onClick={() => setProductUpdated(false)}
          >
            Done
          </Button>
        </div>
      </Modal>

      <Modal open={openDelete} onOpenChange={setOpenDelete}>
        <div className="space-y-[40px]">
          <div className="space-y-[24px] text-center">
            <DeleteIcon className="mx-auto h-[48px] w-[48px] text-[#CB1A14]" />
            <div className="space-y-[8px]">
              <p className="font-[600] text-[24px] text-[#CB1A14]">
                Remove {productToDelete?.name}?
              </p>
              <p className="font-[500] text-[16px] text-[#363636]">
                Are you sure you want to remove this product from your
                inventory?
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setOpenDelete(false)}
            >
              Cancel
            </Button>
            <Button variant="danger" size="sm" onClick={handleDeleted}>
              Remove product
            </Button>
          </div>
        </div>
      </Modal>

      <Modal open={deleted} onOpenChange={setDeleted}>
        <div className="space-y-[64px] text-center">
          <div className="space-y-[24px]">
            <VerifyIcon className="mx-auto text-light" color="#04907E" />
            <div className="space-y-[8px]">
              <p className="font-[600] text-[24px] text-[#04907E]">
                {productToDelete?.name} removed successfully!
              </p>
              <p className="font-[500] text-[16px] text-[#363636]">
                The product has been removed from your inventory
              </p>
            </div>
          </div>
          <Button
            className="max-w-[362px] !bg-[#004E46] !text-white"
            onClick={() => setDeleted(false)}
          >
            Done
          </Button>
        </div>
      </Modal>
    </>
  );
}
