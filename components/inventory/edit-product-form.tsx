"use client";

import { useState, useEffect } from "react";
import Input from "../ui/input";
import Select from "../ui/select";
import { Calendar } from "../ui/calendar";
import Image from "next/image";
import FileUpload from "../ui/file-uploaded";
import Button from "../ui/button";
import { Modal } from "../ui/modal";
import { VerifyIcon } from "../icons/svgs";
import { Product } from "@/types/inventory/type";

type EditProductFormProps = {
  product: Product | null;
  onClose: () => void;
  onProductUpdated?: (updatedProduct: Product) => void;
};

export function EditProductForm({
  product,
  onClose,
  onProductUpdated,
}: EditProductFormProps) {
  const [productName, setProductName] = useState("");
  const [category, setCategory] = useState("");
  const [unit, setUnit] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [lowStockThreshold, setLowStockThreshold] = useState("");
  const [imageBase64, setImageBase64] = useState("");
  const [productSaved, setProductSaved] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);

  useEffect(() => {
    if (product) {
      setProductName(product.name);
      setCategory(product.category);
      setUnit(product.unit);
      setPrice(product.price.toString());
      setQuantity(product.quantity.toString());
      setLowStockThreshold(product.lowStock?.toString() || "");
      setImageBase64(product.image || "");

      if (product.expiryDate) {
        setSelectedDate(new Date(product.expiryDate));
      }
    }
  }, [product]);

  const handleFileSelect = (file: File | null) => {
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImageBase64(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    if (
      !product ||
      !productName ||
      !category ||
      !unit ||
      !price ||
      !quantity ||
      !selectedDate
    ) {
      return;
    }

    const updatedProduct: Product = {
      ...product,
      name: productName,
      category,
      unit,
      price: parseFloat(price),
      quantity: parseInt(quantity),
      expiryDate: selectedDate.toISOString().split("T")[0],
      lowStock: lowStockThreshold
        ? parseInt(lowStockThreshold)
        : product.lowStock || 10,
      image: imageBase64 || product.image,
    };

    onProductUpdated?.(updatedProduct);
    setProductSaved(true);
  };

  if (!product) return null;

  return (
    <>
      <div className="space-y-[64px]">
        <div className="space-y-[32px]">
          <div className="text-center space-y-[12px]">
            <p className="font-[600] text-[24px] text-[#131313]">
              Edit Product
            </p>

            <p className="font-[400] text-[16px] text-[#363636]">
              Change the product details below{" "}
            </p>
          </div>

          <div className="space-y-[32px]">
            <div>
              <Input
                placeholder="Input Enter product name"
                label="Product Name"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-[11px]">
              <Select
                label="Category"
                placeholder="Select Category"
                value={category}
                onValueChange={setCategory}
                options={[
                  { value: "Food", label: "Food" },
                  { value: "Beverages", label: "Beverages" },
                  { value: "Drinks", label: "Drinks" },
                  { value: "Snacks", label: "Snacks" },
                  { value: "Grocceries", label: "Grocceries" },
                  { value: "Household", label: "Household" },
                  { value: "Stationaries", label: "Stationaries" },
                  { value: "Water", label: "Water" },
                  { value: "Alcoholics", label: "Alcoholics" },
                  { value: "Custom", label: "Custom" },
                ]}
              />

              <Select
                label="Units(s)"
                placeholder="Select Unit"
                value={unit}
                onValueChange={setUnit}
                options={[
                  { value: "Pieces", label: "Pieces" },
                  { value: "kilogram", label: "kilogram" },
                  { value: "Liter", label: "Liter" },
                  { value: "Pack", label: "Pack" },
                  { value: "Carton", label: "Carton" },
                  { value: "Custom", label: "Custom" },
                ]}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-[11px]">
              <Input
                placeholder="₦0.00"
                label="Price (₦)"
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />

              <Input
                placeholder="0"
                label="Quantity"
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
            </div>

            <div className="space-y-[12px]">
              <label className="block font-semibold text-[12px] text-[#131313]">
                Expiration Date
              </label>
              <div className="relative space-y-[8px]">
                <Input
                  placeholder="Select date"
                  value={selectedDate ? selectedDate.toLocaleDateString() : ""}
                  readOnly
                  prefixicon={
                    <button
                      type="button"
                      onClick={() => setShowCalendar(!showCalendar)}
                      className="pointer-events-auto"
                    >
                      <Image
                        src={"/icons/calendar.svg"}
                        width={20}
                        height={20}
                        alt="calendar"
                      />
                    </button>
                  }
                />
                <p className="font-[500] text-[12px] text-[#6C6C6C]">
                  This product will be prioritize for sale before it expires to
                  help sell them faster
                </p>
                {showCalendar && (
                  <div className="absolute top-full left-0 mt-2 z-50 pointer-events-auto">
                    <Calendar
                      value={selectedDate}
                      onChange={(date) => {
                        setSelectedDate(date);
                        setShowCalendar(false);
                      }}
                    />
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-[8px]">
              <Input
                placeholder="<10"
                label="Low Stock Threshold (optional)"
                type="number"
                value={lowStockThreshold}
                onChange={(e) => setLowStockThreshold(e.target.value)}
              />
              <p className="font-[500] text-[12px] text-[#6C6C6C]">
                This item will be marked as ‘Low in stock’ when stock falls
                between this number
              </p>
            </div>

            <div>
              <FileUpload
                label="Upload Image"
                onFileSelect={handleFileSelect}
              />
            </div>

            <div className="space-y-[32px]">
              <p className="font-[600] text-[12px] text-[#131313]">
                Upload Image
              </p>

              <div className="max-w-[343px]">
                <div className="h-[249px] bg-white w-full relative p-[10px]">
                  <Image
                    src={imageBase64}
                    fill
                    alt="product-name"
                    className="object-cover rounded-[8px]"
                  />
                </div>

                <Button variant="secondary" className="text-primary-color">
                  Update image
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-[16px]">
          <Button variant="secondary" size="sm" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSave}>Save Changes</Button>
        </div>
      </div>

      <Modal open={productSaved} onOpenChange={setProductSaved}>
        <div className="space-y-[64px]">
          <div className="space-y-[40px]">
            <VerifyIcon className="mx-auto text-light" />

            <div className="space-y-[8px] text-center">
              <p className="font-[600] text-[24px] text-light">
                Product updated successfully!
              </p>

              <p className="font-[500] text-[16px] text-[#363636]">
                {productName} has been updated
              </p>
            </div>
          </div>

          <div className="flex justify-center w-[362] mx-auto ">
            <Button
              size="sm"
              onClick={() => {
                setProductSaved(false);
                onClose();
              }}
            >
              Done
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
}
