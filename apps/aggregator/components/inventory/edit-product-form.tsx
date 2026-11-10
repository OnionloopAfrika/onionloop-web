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
import { Product, ProductFormState } from "@/types/inventory/type";

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
  const [productSaved, setProductSaved] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);

  const [productForm, setProductForm] = useState<ProductFormState>({
    productName: "",
    category: "",
    unit: "",
    price: "",
    quantity: "",
    selectedDate: undefined,
    lowStockThreshold: "",
    imageBase64: "",
  });

  const handleFieldChange = (field: keyof ProductFormState) => (value: any) => {
    setProductForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  useEffect(() => {
    if (product) {
      setProductForm({
        productName: product.name,
        category: product.category,
        unit: product.unit,
        price: product.price.toString(),
        quantity: product.quantity.toString(),
        selectedDate: product.expiryDate ? new Date(product.expiryDate) : undefined,
        lowStockThreshold: product.lowStock?.toString() || "",
        imageBase64: product.image || "",
      });
    }
  }, [product]);

  const handleFileSelect = (file: File | null) => {
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => handleFieldChange("imageBase64")(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    if (
      !product ||
      !productForm.productName ||
      !productForm.category ||
      !productForm.unit ||
      !productForm.price ||
      !productForm.quantity ||
      !productForm.selectedDate
    ) {
      return;
    }

    const updatedProduct: Product = {
      ...product,
      name: productForm.productName,
      category: productForm.category,
      unit: productForm.unit,
      price: parseFloat(productForm.price),
      quantity: parseInt(productForm.quantity),
      expiryDate: productForm.selectedDate.toISOString().split("T")[0],
      lowStock: productForm.lowStockThreshold
        ? parseInt(productForm.lowStockThreshold)
        : product.lowStock || 10,
      image: productForm.imageBase64 || product.image,
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
                value={productForm.productName}
                onChange={(e) => handleFieldChange("productName")(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-[11px]">
              <Select
                label="Category"
                placeholder="Select Category"
                value={productForm.category}
                onValueChange={handleFieldChange("category")}
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
                value={productForm.unit}
                onValueChange={handleFieldChange("unit")}
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
                value={productForm.price}
                onChange={(e) => handleFieldChange("price")(e.target.value)}
              />

              <Input
                placeholder="0"
                label="Quantity"
                type="number"
                value={productForm.quantity}
                onChange={(e) => handleFieldChange("quantity")(e.target.value)}
              />
            </div>

            <div className="space-y-[12px]">
              <label className="block font-semibold text-[12px] text-[#131313]">
                Expiration Date
              </label>
              <div className="relative space-y-[8px]">
                <Input
                  placeholder="Select date"
                  value={productForm.selectedDate ? productForm.selectedDate.toLocaleDateString() : ""}
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
                      value={productForm.selectedDate}
                      onChange={(date) => {
                        handleFieldChange("selectedDate")(date);
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
                value={productForm.lowStockThreshold}
                onChange={(e) => handleFieldChange("lowStockThreshold")(e.target.value)}
              />
              <p className="font-[500] text-[12px] text-[#6C6C6C]">
                This item will be marked as 'Low in stock' when stock falls
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
                    src={productForm.imageBase64}
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
                {productForm.productName} has been updated
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
