"use client"
import { Users, Settings, Clock, Mail, BarChart3, FileSpreadsheet, UserRound, Headset, MapPin, MonitorCheck } from '@/components/icons/billing-icons/svgs';
import Header from '@/components/layouts/header';
import React, { useState, useEffect } from 'react';

type PlanFeature = {
    icon: React.ReactNode;
    text: string;
};

type Plan = {
    name: string;
    description: string;
    price: string;
    subtext: string;
    featuresHeader: string;
    features: PlanFeature[];
    buttonText: string;
    isCurrent?: boolean;
    isPopular?: boolean;
};

const PricingSection: React.FC = () => {
    const [billingCycle, setBillingCycle] = useState<'Monthly' | 'Annual'>('Monthly');

    useEffect(() => {
        const handleHash = () => {
            const hash = window.location.hash.replace('#', '');
            if (hash === 'annual') setBillingCycle('Annual');
            if (hash === 'monthly') setBillingCycle('Monthly');
        };

        handleHash();
        window.addEventListener('hashchange', handleHash);
        return () => window.removeEventListener('hashchange', handleHash);
    }, []);

    const updateCycle = (cycle: 'Monthly' | 'Annual') => {
        setBillingCycle(cycle);
        window.history.pushState(null, '', `#${cycle.toLowerCase()}`);
    };

    const monthlyPlans: Plan[] = [
        {
            name: 'Basic Plan',
            description: 'Perfect for small businesses just getting started',
            price: '₦5,000',
            subtext: '/ month',
            featuresHeader: "What's included:",
            features: [
                { icon: <Users size={16} />, text: 'Up to 3 staff accounts' },
                { icon: <Settings size={16} />, text: 'Basic inventory management' },
                { icon: <Clock size={16} />, text: 'Transaction history (30 days)' },
                { icon: <Mail size={16} />, text: 'Email Support' },
                { icon: <BarChart3 size={16} />, text: 'Standard analytics dashboard' },
            ],
            buttonText: 'Get Started',
        },
        {
            name: 'Growth Plan',
            description: 'Ideal for growing businesses that need more power.',
            price: '₦10,000',
            subtext: '/ month',
            featuresHeader: 'Everything included in Basic, plus:',
            features: [
                { icon: <Users size={16} />, text: 'Up to 10 staff accounts' },
                { icon: <Settings size={16} />, text: 'Full inventory management' },
                { icon: <Clock size={16} />, text: 'Unlimited transaction history (30 days)' },
                { icon: <Mail size={16} />, text: 'Priority email & chat support' },
                { icon: <BarChart3 size={16} />, text: 'Advanced analytics & reports' },
                { icon: <FileSpreadsheet size={16} />, text: 'CSV/Excel export' },
            ],
            buttonText: 'Upgrade to Growth',
        },
        {
            name: 'Business Plan',
            description: 'For established businesses with advanced operational needs.',
            price: '₦15,000',
            subtext: '/ month',
            featuresHeader: 'Everything included in Growth, plus:',
            features: [
                { icon: <Users size={16} />, text: 'Up to 15 staff accounts' },
                { icon: <Settings size={16} />, text: 'Unlimited inventory' },
                { icon: <UserRound size={16} />, text: 'Dedicated account manager' },
                { icon: <Headset size={16} />, text: '24/7 priority support' },
                { icon: <MonitorCheck size={16} />, text: 'Advanced integration (API)' },
                { icon: <BarChart3 size={16} />, text: 'Custom reports & insights' },
                { icon: <MapPin size={16} />, text: 'Multi-branch/location support' },
            ],
            buttonText: 'Current Plan',
            isCurrent: true,
        },
    ];

    const annualPlans: Plan[] = [
        {
            name: 'Basic Plan',
            description: 'Perfect for small businesses just getting started',
            price: '₦48,000',
            subtext: '/ year',
            featuresHeader: "What's included:",
            features: [
                { icon: <Users size={16} />, text: 'Up to 3 staff accounts' },
                { icon: <Settings size={16} />, text: 'Basic inventory management' },
                { icon: <Clock size={16} />, text: 'Transaction history (30 days)' },
                { icon: <Mail size={16} />, text: 'Email Support' },
                { icon: <BarChart3 size={16} />, text: 'Standard analytics dashboard' },
            ],
            buttonText: 'Get Started',
        },
        {
            name: 'Growth Plan',
            description: 'Ideal for growing businesses that need more power.',
            price: '₦96,000',
            subtext: '/ year',
            featuresHeader: 'Everything included in Basic, plus:',
            features: [
                { icon: <Users size={16} />, text: 'Up to 10 staff accounts' },
                { icon: <Settings size={16} />, text: 'Full inventory management' },
                { icon: <Clock size={16} />, text: 'Unlimited transaction history (30 days)' },
                { icon: <Mail size={16} />, text: 'Priority email & chat support' },
                { icon: <BarChart3 size={16} />, text: 'Advanced analytics & reports' },
                { icon: <FileSpreadsheet size={16} />, text: 'CSV/Excel export' },
            ],
            buttonText: 'Upgrade to Growth',
        },
        {
            name: 'Business Plan',
            description: 'For established businesses with advanced operational needs.',
            price: '₦144,000',
            subtext: '/ year',
            featuresHeader: 'Everything included in Growth, plus:',
            features: [
                { icon: <Users size={16} />, text: 'Up to 15 staff accounts' },
                { icon: <Settings size={16} />, text: 'Unlimited inventory' },
                { icon: <UserRound size={16} />, text: 'Dedicated account manager' },
                { icon: <Headset size={16} />, text: '24/7 priority support' },
                { icon: <MonitorCheck size={16} />, text: 'Advanced integration (API)' },
                { icon: <BarChart3 size={16} />, text: 'Custom reports & insights' },
                { icon: <MapPin size={16} />, text: 'Multi-branch/location support' },
            ],
            buttonText: 'Current Plan',
            isCurrent: true,
        },
    ];

    const activePlans = billingCycle === 'Monthly' ? monthlyPlans : annualPlans;

    return (
        <div className="min-h-screen">
            <div className="">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6 w-full">
                    <Header
                        heading="Plans & Pricing "
                        subHeading="Select the plan that fits your business needs. Upgrade, downgrade or cancel at any time."
                    />

                    <div className="flex items-center bg-white p-2 rounded-xl border border-gray-100 shadow-sm gap-8">
                        <span className="text-sm font-semibold text-black whitespace-nowrap">
                            Billing Cycle
                        </span>

                        <div className="flex items-center border border-[#686764]/30 rounded-[10px] overflow-hidden">
                            <button
                                id="monthly"
                                onClick={() => updateCycle('Monthly')}
                                className={`px-8 py-2.5 text-sm font-medium transition-all whitespace-nowrap ${billingCycle === 'Monthly'
                                    ? 'rounded-[10px] bg-[#024E44] text-white'
                                    : 'bg-white text-[#686764]'
                                    }`}
                            >
                                Monthly
                            </button>

                            <button
                                id="annual"
                                onClick={() => updateCycle('Annual')}
                                className={`px-8 py-2.5 text-sm font-medium flex items-center gap-2 transition-all whitespace-nowrap border-[#686764]/30 ${billingCycle === 'Annual'
                                    ? 'rounded-[10px] bg-[#024E44] text-white'
                                    : 'bg-white text-[#686764]'
                                    }`}
                            >
                                Annual
                                <span className={`text-[10px] px-1.5 py-0.5 rounded-sm font-bold inline-block ${billingCycle === 'Annual'
                                    ? 'bg-white/20 text-white'
                                    : 'bg-[#E1F9F6] text-[#024E44]'
                                    }`}>
                                    Save 20%
                                </span>
                            </button>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
                    {activePlans.map((plan) => (
                        <div
                            key={plan.name}
                            className={`relative flex flex-col bg-white rounded-xl transition-all duration-300 ${plan.isCurrent
                                ? 'ring-2 ring-[#024E44] shadow-2xl scale-[1.02] z-10'
                                : 'border border-gray-200 shadow-sm'
                                }`}
                        >
                            {plan.isCurrent && (
                                <div className="bg-[#024E44] h-6 w-full rounded-t-lg absolute top-0 left-0" />
                            )}

                            <div className={`p-8 flex flex-col grow ${plan.isCurrent ? 'pt-12' : ''}`}>
                                <div className="text-center mb-6 max-w-[288px] mx-auto w-full">
                                    <h3 className="text-2xl font-semibold text-[#363636]">{plan.name}</h3>
                                    <p className="text-[#6C6C6C] text-sm mt-2 leading-relaxed">
                                        {plan.description}
                                    </p>
                                </div>

                                <div className="flex items-center justify-center gap-1 mb-6 border-t border-[#131313] py-6 max-w-[288px] mx-auto w-full">
                                    <span className="text-3xl font-medium text-[#363636]">{plan.price}</span>
                                    <span className="text-sm text-[#131313]">{plan.subtext}</span>
                                </div>

                                <div className="mb-8 grow">
                                    <p className="text-sm font-medium text-[#131313] mb-6">{plan.featuresHeader}</p>
                                    <ul className="space-y-5">
                                        {plan.features.map((feature, idx) => (
                                            <li key={idx} className="flex items-start gap-3">
                                                <div className="p-2 rounded-[1.652px] bg-white text-[#024E44] shadow-[0_0.826px_2.065px_-0.826px_rgba(16,25,40,0.06),0_0.826px_2.89px_0_rgba(16,25,40,0.05)] ring-[0.413px] ring-black/5 w-8 h-8">
                                                    {feature.icon}
                                                </div>
                                                <span className="text-sm text-[#131313] font-medium">{feature.text}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <button
                                    className={`w-full py-4 rounded-lg font-medium text-sm transition-colors ${plan.isCurrent
                                        ? 'bg-[#024E44] text-white hover:bg-[#024E44]'
                                        : 'bg-gray-200 text-[#686764] hover:bg-gray-300'
                                        }`}
                                >
                                    {plan.buttonText}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PricingSection;