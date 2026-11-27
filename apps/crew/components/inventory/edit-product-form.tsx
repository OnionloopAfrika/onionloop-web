"use client";

import { useRef, useState } from "react";
import Input from "../ui/input";
import Select from "../ui/select";
import { Calendar } from "../ui/calendar";
import Image from "next/image";
import FileUpload from "../ui/file-uploaded";
import Button from "../ui/button";
import { Modal } from "../ui/modal";
import { VerifyIcon } from "../icons/svgs";
import { Product, ProductFormState } from "@/types/inventory/type";

const defaultCategories = [
  { value: "Food", label: "Food" },
  { value: "Beverages", label: "Beverages" },
  { value: "Drinks", label: "Drinks" },
  { value: "Snacks", label: "Snacks" },
  { value: "Grocceries", label: "Grocceries" },
  { value: "Household", label: "Household" },
  { value: "Stationaries", label: "Stationaries" },
  { value: "Water", label: "Water" },
  { value: "Alcoholics", label: "Alcoholics" },
];

type EditProductFormProps = {
  product: Product | null;
  onClose: () => void;
  onProductUpdated?: (updatedProduct: Product) => void;
};

const createProductFormState = (product: Product | null): ProductFormState => ({
  productName: product?.name ?? "",
  category: product?.category ?? "",
  unit: product?.unit ?? "",
  price: product?.price.toString() ?? "",
  costPrice: product?.costPrice?.toString() ?? "",
  quantity: product?.quantity.toString() ?? "",
  selectedDate: product?.expiryDate ? new Date(product.expiryDate) : undefined,
  lowStockThreshold: product?.lowStock?.toString() ?? "",
  imageBase64: product?.image ?? "",
});

export function EditProductForm({
  product,
  onClose,
  onProductUpdated,
}: EditProductFormProps) {
  const [showCalendar, setShowCalendar] = useState(false);
  const [formError, setFormError] = useState("");
  const imageInputRef = useRef<HTMLInputElement>(null);
  const [customCategories, setCustomCategories] = useState<string[]>([]);
  const [selectedCustomCategories, setSelectedCustomCategories] = useState<
    string[]
  >([]);
  const [categoryDraft, setCategoryDraft] = useState("");
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);
  const [categorySaved, setCategorySaved] = useState(false);
  const [savedCategoryNames, setSavedCategoryNames] = useState("");
  const [categoryError, setCategoryError] = useState("");

  const [productForm, setProductForm] = useState<ProductFormState>(() =>
    createProductFormState(product),
  );

  const handleFieldChange =
    <K extends keyof ProductFormState>(field: K) =>
    (value: ProductFormState[K]) => {
      setFormError("");
      setProductForm((prev) => ({
        ...prev,
        [field]: value,
      }));
    };

  const handleFileSelect = (file: File | null) => {
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === "string") {
          handleFieldChange("imageBase64")(reader.result);
        }
      };
      reader.onerror = () => {
        setFormError("Unable to read this image. Please choose another file.");
      };
      reader.readAsDataURL(file);
    } else {
      handleFieldChange("imageBase64")("");
    }
  };

  const openCustomCategoryModal = () => {
    let categoriesToUse = customCategories;
    try {
      const saved = localStorage.getItem("inventory-custom-categories");
      if (saved) {
        const parsed: unknown = JSON.parse(saved);
        if (
          !Array.isArray(parsed) ||
          !parsed.every((category) => typeof category === "string")
        ) {
          throw new Error("Saved custom categories have an invalid format.");
        }
        categoriesToUse = parsed;
      }
    } catch (error) {
      console.error("Unable to load custom product categories:", error);
      setCategoryError("Unable to load categories. Please try again.");
      return;
    }

    const currentCategory = productForm.category;
    if (
      currentCategory &&
      !defaultCategories.some(
        (category) => category.value === currentCategory,
      ) &&
      !categoriesToUse.includes(currentCategory)
    ) {
      categoriesToUse = [...categoriesToUse, currentCategory];
    }

    setCustomCategories(categoriesToUse);
    setCategoryDraft("");
    setCategoryError("");
    setSelectedCustomCategories(
      categoriesToUse.includes(currentCategory) ? [currentCategory] : [],
    );
    setCategoryModalOpen(true);
  };

  const saveCustomCategories = () => {
    const pendingCategories = categoryDraft
      .split(",")
      .map((category) => category.trim())
      .filter(Boolean);
    const allCategories = Array.from(
      new Map(
        [...customCategories, ...pendingCategories].map((category) => [
          category.toLocaleLowerCase(),
          category,
        ]),
      ).values(),
    );
    const selectedCategories = Array.from(
      new Set([...selectedCustomCategories, ...pendingCategories]),
    );

    if (selectedCategories.length === 0) {
      setCategoryError("Add or select at least one category.");
      return;
    }

    try {
      localStorage.setItem(
        "inventory-custom-categories",
        JSON.stringify(allCategories),
      );
    } catch (error) {
      console.error("Unable to save custom product categories:", error);
      setCategoryError("Unable to save categories. Please try again.");
      return;
    }

    setCustomCategories(allCategories);
    setProductForm((previous) => ({
      ...previous,
      category: selectedCategories[0],
    }));
    setSavedCategoryNames(selectedCategories.join(", "));
    setCategoryModalOpen(false);
    setCategorySaved(true);
    setCategoryError("");
  };

  const handleSave = () => {
    const name = productForm.productName.trim();
    const costPrice = Number(productForm.costPrice);
    const sellingPrice = Number(productForm.price);
    const quantity = Number(productForm.quantity);
    const thresholdText = productForm.lowStockThreshold.trim();
    const lowStock = thresholdText
      ? Number(thresholdText)
      : (product?.lowStock ?? 10);

    if (
      !product ||
      !name ||
      !productForm.category ||
      !productForm.unit ||
      !productForm.costPrice ||
      !productForm.price ||
      !productForm.quantity ||
      !productForm.selectedDate
    ) {
      setFormError("Please complete all required product fields.");
      return;
    }

    if (
      !Number.isFinite(costPrice) ||
      costPrice < 0 ||
      !Number.isFinite(sellingPrice) ||
      sellingPrice < 0 ||
      !Number.isInteger(quantity) ||
      quantity < 0 ||
      (thresholdText && (!Number.isInteger(lowStock) || lowStock < 0))
    ) {
      setFormError(
        "Enter valid non-negative prices and whole stock quantities.",
      );
      return;
    }

    const updatedProduct: Product = {
      ...product,
      name,
      category: productForm.category,
      unit: productForm.unit,
      price: sellingPrice,
      costPrice,
      quantity,
      expiryDate: productForm.selectedDate.toISOString().split("T")[0],
      lowStock,
      image: productForm.imageBase64 || undefined,
    };

    onProductUpdated?.(updatedProduct);
    onClose();
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
                onChange={(e) =>
                  handleFieldChange("productName")(e.target.value)
                }
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-[11px]">
              <Select
                label="Category"
                placeholder="Select Category"
                value={productForm.category}
                onValueChange={(value) => {
                  if (value === "Custom") {
                    openCustomCategoryModal();
                    return;
                  }
                  handleFieldChange("category")(value);
                }}
                className="w-full !border-[#C7C7C7] !bg-[#F7F7F7] "
                options={[
                  ...defaultCategories,
                  ...customCategories.map((category) => ({
                    value: category,
                    label: category,
                  })),
                  { value: "Custom", label: "Custom" },
                ]}
              />

              <Select
                label="Units(s)"
                placeholder="Select Unit"
                value={productForm.unit}
                onValueChange={handleFieldChange("unit")}
                className="w-full !border-[#C7C7C7] !bg-[#F7F7F7] "
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
                label="Cost Price (₦)"
                type="number"
                min="0"
                step="0.01"
                value={productForm.costPrice ?? ""}
                onChange={(e) => handleFieldChange("costPrice")(e.target.value)}
              />

              <Input
                placeholder="₦0.00"
                label="Selling Price (₦)"
                type="number"
                min="0"
                step="0.01"
                value={productForm.price}
                onChange={(e) => handleFieldChange("price")(e.target.value)}
              />
            </div>

            <Input
              placeholder="0"
              label="Stock Quantity"
              type="number"
              min="0"
              step="1"
              value={productForm.quantity}
              onChange={(e) => handleFieldChange("quantity")(e.target.value)}
            />

            <div className="space-y-[8px]">
              <Input
                placeholder="<10"
                label="Low Stock Threshold (optional)"
                type="number"
                min="0"
                step="1"
                value={productForm.lowStockThreshold}
                onChange={(e) =>
                  handleFieldChange("lowStockThreshold")(e.target.value)
                }
              />
              <p className="font-[500] text-[12px] text-[#6C6C6C]">
                This item will be marked as &apos;Low in stock&apos; when stock
                falls between this number
              </p>
            </div>

            <div className="space-y-[12px]">
              <label className="block font-semibold text-[12px] text-[#131313]">
                Expiration Date
              </label>
              <div className="relative space-y-[8px]">
                <Input
                  placeholder="Select date"
                  value={
                    productForm.selectedDate
                      ? productForm.selectedDate.toLocaleDateString()
                      : ""
                  }
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

            {productForm.imageBase64 ? (
              <div className="space-y-[12px]">
                <p className="block font-semibold text-[12px] text-[#131313]">
                  Upload Image
                </p>
                <div className="relative h-[220px] w-full">
                  <Image
                    src={productForm.imageBase64}
                    fill
                    sizes="(max-width: 768px) 100vw, 600px"
                    alt={`${productForm.productName || "Product"} preview`}
                    unoptimized
                    className="rounded-[8px] object-cover"
                  />
                </div>
                <input
                  ref={imageInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(event) => {
                    const file = event.target.files?.[0];
                    if (file) handleFileSelect(file);
                    event.target.value = "";
                  }}
                />
                <Button
                  variant="secondary"
                  className="max-w-[343px] !text-light"
                  onClick={() => imageInputRef.current?.click()}
                >
                  Update Image
                </Button>
              </div>
            ) : (
              <FileUpload
                label="Upload Image"
                onFileSelect={handleFileSelect}
              />
            )}
          </div>
        </div>

        {formError && (
          <p role="alert" className="text-[12px] text-danger">
            {formError}
          </p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-[16px]">
          <Button variant="secondary" size="sm" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSave}>Save Changes</Button>
        </div>
      </div>
      <Modal
        open={categoryModalOpen}
        onOpenChange={(open) => {
          setCategoryModalOpen(open);
          if (!open) setCategoryError("");
        }}
      >
        <div className="space-y-[32px]">
          <div className="space-y-[12px] text-center">
            <p className="font-[600] text-[20px] text-[#131313]">
              Add New Category
            </p>
            <p className="text-[14px] text-[#363636]">
              Enter any categories of your choice or select from the options
              below
            </p>
          </div>

          <div className="space-y-2">
            <label
              htmlFor="edit-custom-category-name"
              className="block font-semibold text-[12px] text-[#131313]"
            >
              Category Name
            </label>
            <Input
              id="edit-custom-category-name"
              placeholder="Enter category name"
              value={categoryDraft}
              onChange={(event) => {
                setCategoryDraft(event.target.value);
                setCategoryError("");
              }}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  event.preventDefault();
                  saveCustomCategories();
                }
              }}
              className="!bg-white"
            />
          </div>

          {customCategories.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {customCategories.map((category) => {
                const isSelected = selectedCustomCategories.includes(category);
                return (
                  <button
                    key={category}
                    type="button"
                    aria-pressed={isSelected}
                    onClick={() =>
                      setSelectedCustomCategories((selected) =>
                        isSelected
                          ? selected.filter((item) => item !== category)
                          : [...selected, category],
                      )
                    }
                    className={`rounded-[4px] border px-3 py-2 text-[12px] ${
                      isSelected
                        ? "border-[#04907E] text-[#04907E]"
                        : "border-[#E5E7EB] text-[#6C6C6C]"
                    }`}
                  >
                    {isSelected ? "✓ " : "+ "}
                    {category}
                  </button>
                );
              })}
            </div>
          )}

          {categoryError && (
            <p role="alert" className="text-[12px] text-danger">
              {categoryError}
            </p>
          )}

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setCategoryModalOpen(false)}
            >
              Cancel
            </Button>
            <Button size="sm" onClick={saveCustomCategories}>
              Save Category
            </Button>
          </div>
        </div>
      </Modal>

      <Modal open={categorySaved} onOpenChange={setCategorySaved}>
        <div className="space-y-[64px] text-center">
          <div className="space-y-[24px]">
            <VerifyIcon className="mx-auto text-light" color="#04907E" />
            <div className="space-y-[8px]">
              <p className="font-[600] text-[24px] text-[#04907E]">
                Category saved successfully!
              </p>
              <p className="font-[500] text-[16px] text-[#363636]">
                {savedCategoryNames} has been added to the category section
              </p>
            </div>
          </div>
          <Button
            className="max-w-[362px] !bg-[#004E46] !text-white"
            onClick={() => setCategorySaved(false)}
          >
            Done
          </Button>
        </div>
      </Modal>
    </>
  );
}
