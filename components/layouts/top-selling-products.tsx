"use client";

import React, { useState } from 'react';
import Select from '../ui/select';

interface Product {
    id: number;
    name: string;
    image: string;
    salesCount: number;
    revenue: string;
}

const mockProducts: Product[] = [
    {
        id: 1,
        name: 'Cocacola',
        image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?q=80&w=120&auto=format&fit=crop',
        salesCount: 400,
        revenue: '₦12.4M',
    },
    {
        id: 2,
        name: 'Chicken Pizza',
        image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=120&auto=format&fit=crop',
        salesCount: 390,
        revenue: '₦12.4M',
    },
    {
        id: 3,
        name: 'Ice cream',
        image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?q=80&w=120&auto=format&fit=crop',
        salesCount: 300,
        revenue: '₦12.4M',
    },
    {
        id: 4,
        name: 'Burger',
        image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=120&auto=format&fit=crop',
        salesCount: 291,
        revenue: '₦12.4M',
    },
    {
        id: 5,
        name: 'Pepsi',
        image: 'https://images.unsplash.com/photo-1629203851122-3726ecdf080e?q=80&w=120&auto=format&fit=crop',
        salesCount: 289,
        revenue: '₦12.4M',
    },
    {
        id: 6,
        name: 'Pepsi Zero Sugar',
        image: 'https://images.unsplash.com/photo-1629203851122-3726ecdf080e?q=80&w=120&auto=format&fit=crop',
        salesCount: 289,
        revenue: '₦12.4M',
    },
];

const dropdownOptions = [
    { value: "this-week", label: "This week" },
    { value: "30-days", label: "30 days" },
    { value: "60-days", label: "60 days" },
];

export default function TopSellingProducts() {
    const [timeframe, setTimeframe] = useState("this-week")    
    return (
        <div className="w-full max-w-4xl p-4">
            <div className="flex items-center justify-between mb-8">
                <h2 className="text-[20px] font-semibold text-gray-900 tracking-tight">Top Selling Products</h2>
                <div className="w-[140px]">
                    <Select
                        value={timeframe}
                        onValueChange={setTimeframe}
                        options={dropdownOptions}
                    />
                </div>
            </div>

            <div className="flex flex-col">
                {mockProducts.map((product, index) => (
                    <div key={product.id}>
                        <div className="flex items-center justify-between py-[18px]">
                            <div className="flex items-center gap-5 flex-1">
                                <div className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center overflow-hidden flex-shrink-0">
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="w-10 h-10 object-cover rounded-full"
                                    />
                                </div>
                                <span className="text-sm font-medium text-gray-600">{product.name}</span>
                            </div>

                            <div className="flex items-center justify-between w-1/2 max-w-[400px]">
                                <span className="text-sm font-medium text-gray-600 w-24 text-left">
                                    {product.salesCount}
                                </span>
                                <span className="text-sm font-medium text-gray-600 text-right">
                                    {product.revenue}
                                </span>
                            </div>
                        </div>
                        {index < mockProducts.length - 1 && (
                            <hr className="border-gray-200" />
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}