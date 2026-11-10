"use client";

import React, { useState, useRef, useEffect } from "react";
import { SearchIcon } from "@/components/icons/svgs";
import Image from "next/image";

interface MenuItem {
  id: string;
  name: string;
  price: string;
  stock: string;
  image: string;
  isAdded: boolean;
}

interface EmployeeItem {
  id: string;
  name: string;
  role: string;
  avatarUrl: string;
}

interface ChatItem {
  id: string;
  name: string;
  avatar: string;
  message: string;
}

interface SearchInputProps {
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  categories?: string[];
  products?: MenuItem[];
  employees?: EmployeeItem[];
  chats?: ChatItem[];
  onProductClick?: (product: MenuItem) => void;
  onCategoryClick?: (category: string) => void;
  onEmployeeClick?: (employee: EmployeeItem) => void;
  onChatClick?: (chat: ChatItem) => void;
  className?: string;
}

export function SearchInput({
  placeholder = "Search for products or categories...",
  value,
  onChange,
  categories = ["Drinks", "Snacks", "Groceries"],
  products = [],
  employees = [],
  chats = [],
  onProductClick,
  onCategoryClick,
  onEmployeeClick,
  onChatClick,
  className = "",
}: SearchInputProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes((value || "").toLowerCase()),
  );

  const filteredEmployees = employees.filter((employee) =>
    employee.name.toLowerCase().includes((value || "").toLowerCase()),
  );

  const filteredChats = chats.filter((chat) =>
    chat.name.toLowerCase().includes((value || "").toLowerCase()),
  );

  return (
    <div className="relative w-full" ref={containerRef}>
      <div className="relative">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8A8A8A] pointer-events-auto">
          <SearchIcon className="w-[20px] h-[20px]" />
        </div>
        <input
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          onFocus={() => setIsOpen(true)}
          className={`
            flex h-12 w-full rounded-[12px] border border-[#C7C7C7] bg-[#F7F7F7] 
            pl-12 pr-4 font-semibold text-[14px] text-[#131313]
            placeholder:font-normal placeholder:text-[12px] placeholder:text-[#8A8A8A] 
            focus:outline-none 
            ${className}
          `}
        />
      </div>

      {isOpen && (categories.length > 0 || products.length > 0 || employees.length > 0 || chats.length > 0) && (
        <div className="absolute z-50 mt-2 w-full rounded-[12px] border border-[#C7C7C7] bg-white shadow-lg max-h-[400px] overflow-y-auto">
          <div className="p-4 space-y-4">
            {categories.length > 0 && (
              <div>
                <div className="text-[#6C6C6C] text-[14px] font-[500] mb-2 border-b border-[#C7C7C7] pb-2">
                  CATEGORIES
                </div>
                <div className="space-y-2">
                  {categories.map((category, index) => (
                    <div
                      key={index}
                      onClick={() => {
                        onCategoryClick?.(category);
                        setIsOpen(false);
                      }}
                      className="px-2 py-2 text-[#131313] text-[16px] font-[500] cursor-pointer hover:bg-gray-100 rounded-[8px]"
                    >
                      {category}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {products.length > 0 && (
              <div>
                <div className="text-[#6C6C6C] text-[14px] font-[500] mb-2 border-b border-[#C7C7C7] pb-2">
                  PRODUCTS
                </div>
                <div className="space-y-3">
                  {(filteredProducts.length > 0 ? filteredProducts : products)
                    .slice(0, 5)
                    .map((product) => (
                      <div
                        key={product.id}
                        onClick={() => {
                          onProductClick?.(product);
                          setIsOpen(false);
                        }}
                        className="flex items-center gap-3 px-2 py-2 cursor-pointer hover:bg-gray-100 rounded-[8px]"
                      >
                        <div className="w-[48px] h-[48px] relative flex-shrink-0">
                          <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            className="object-contain rounded-[8px]"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-[#131313] text-[16px] font-[500] truncate">
                            {product.name}
                          </div>
                          <div className="text-[#6C6C6C] text-[12px] font-[400]">
                            50Cl Bottle
                          </div>
                        </div>
                        <div className="text-[#131313] text-[16px] font-[600]">
                          {product.price}
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            )}

            {employees.length > 0 && (
              <div>
                <div className="text-[#6C6C6C] text-[14px] font-[500] mb-2 border-b border-[#C7C7C7] pb-2">
                  EMPLOYEES
                </div>
                <div className="space-y-3">
                  {(filteredEmployees.length > 0
                    ? filteredEmployees
                    : employees
                  )
                    .slice(0, 5)
                    .map((employee) => (
                      <div
                        key={employee.id}
                        onClick={() => {
                          onEmployeeClick?.(employee);
                          setIsOpen(false);
                        }}
                        className="flex items-center gap-3 px-2 py-2 cursor-pointer hover:bg-gray-100 rounded-[8px]"
                      >
                        <div className="w-[48px] h-[48px] rounded-full overflow-hidden flex-shrink-0">
                          <img
                            src={employee.avatarUrl}
                            alt={employee.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-[#131313] text-[16px] font-[500] truncate">
                            {employee.name}
                          </div>
                          <div className="text-[#6C6C6C] text-[12px] font-[400]">
                            {employee.role}
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            )}

            {chats.length > 0 && (
              <div>
                <div className="text-[#6C6C6C] text-[14px] font-[500] mb-2 border-b border-[#C7C7C7] pb-2">
                  CHATS
                </div>
                <div className="space-y-3">
                  {(filteredChats.length > 0 ? filteredChats : chats)
                    .slice(0, 5)
                    .map((chat) => (
                      <div
                        key={chat.id}
                        onClick={() => {
                          onChatClick?.(chat);
                          setIsOpen(false);
                        }}
                        className="flex items-center gap-3 px-2 py-2 cursor-pointer hover:bg-gray-100 rounded-[8px]"
                      >
                        <div className="w-[48px] h-[48px] rounded-full overflow-hidden flex-shrink-0">
                          <img
                            src={chat.avatar}
                            alt={chat.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-[#131313] text-[16px] font-[500] truncate">
                            {chat.name}
                          </div>
                          <div className="text-[#6C6C6C] text-[12px] font-[400] truncate">
                            {chat.message}
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
