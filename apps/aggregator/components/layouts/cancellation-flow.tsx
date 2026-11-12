"use client"
import React from 'react';
import { useRouter } from 'next/navigation';
interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const CancelConfirmationModal: React.FC<ModalProps & { onConfirm: () => void }> = ({ isOpen, onClose, onConfirm }) => {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
            <div className="bg-white rounded-2xl p-8 max-w-md w-full text-center shadow-2xl">
                <div className="flex justify-center mb-4">
                    <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M18.8023 15.0291C17.7609 13.9877 16.0724 13.9877 15.031 15.0291C13.9897 16.0705 13.9897 17.7589 15.031 18.8003L28.2304 31.9997L15.031 45.199C13.9897 46.2404 13.9897 47.9288 15.031 48.9702C16.0724 50.0116 17.7609 50.0116 18.8023 48.9702L32.0016 35.7709L45.2009 48.9702C46.2423 50.0116 47.9308 50.0116 48.9722 48.9702C50.0136 47.9288 50.0136 46.2404 48.9722 45.199L35.7728 31.9997L48.9722 18.8003C50.0136 17.7589 50.0136 16.0705 48.9722 15.0291C47.9308 13.9877 46.2423 13.9877 45.2009 15.0291L32.0016 28.2284L18.8023 15.0291Z" fill="#CB1A14" />
                    </svg>
                </div>
                <h2 className="text-2xl font-bold text-[#CB1A14] mb-2">Cancel Subscription</h2>
                <p className="text-[#6C6C6C] mb-8 text-sm">Are you sure you want to cancel your plan?</p>
                <div className="space-y-3">
                    <button onClick={onConfirm} className="w-full py-3 bg-[#CB1A14] text-white font-normal text-sm rounded-lg hover:bg-[#CB1A14] transition-colors">
                        Proceed to cancel my subscription
                    </button>
                    <button onClick={onClose} className="w-full py-3 bg-[#F7F7F7] text-[#6C6C6C] font-normal text-sm rounded-lg hover:bg-gray-100 transition-colors">
                        Back
                    </button>
                </div>
            </div>
        </div>
    );
};

export const SuccessModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
    const router = useRouter()
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
            <div className="bg-white rounded-2xl p-10 max-w-lg w-full text-center shadow-2xl">
                <div className="flex justify-center mb-6">
                    <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M57.4924 28.6395L53.8657 24.4262C53.1724 23.6262 52.6124 22.1328 52.6124 21.0662V16.5328C52.6124 13.7062 50.2924 11.3862 47.4657 11.3862H42.9324C41.8924 11.3862 40.3724 10.8262 39.5724 10.1328L35.359 6.50617C33.519 4.93284 30.5057 4.93284 28.639 6.50617L24.4524 10.1595C23.6524 10.8262 22.1324 11.3862 21.0924 11.3862H16.479C13.6524 11.3862 11.3324 13.7062 11.3324 16.5328V21.0928C11.3324 22.1328 10.7724 23.6262 10.1057 24.4262L6.5057 28.6662C4.95904 30.5062 4.95904 33.4928 6.5057 35.3328L10.1057 39.5728C10.7724 40.3728 11.3324 41.8662 11.3324 42.9062V47.4662C11.3324 50.2928 13.6524 52.6128 16.479 52.6128H21.0924C22.1324 52.6128 23.6524 53.1728 24.4524 53.8662L28.6657 57.4928C30.5057 59.0662 33.519 59.0662 35.3857 57.4928L39.599 53.8662C40.399 53.1728 41.8924 52.6128 42.959 52.6128H47.4924C50.319 52.6128 52.639 50.2928 52.639 47.4662V42.9328C52.639 41.8928 53.199 40.3728 53.8924 39.5728L57.519 35.3595C59.0657 33.5195 59.0657 30.4795 57.4924 28.6395ZM43.0924 26.9595L30.2124 39.8395C29.839 40.2128 29.3324 40.4262 28.799 40.4262C28.2657 40.4262 27.759 40.2128 27.3857 39.8395L20.9324 33.3862C20.159 32.6128 20.159 31.3328 20.9324 30.5595C21.7057 29.7862 22.9857 29.7862 23.759 30.5595L28.799 35.5995L40.2657 24.1328C41.039 23.3595 42.319 23.3595 43.0924 24.1328C43.8657 24.9062 43.8657 26.1862 43.0924 26.9595Z" fill="#04907E" />
                    </svg>
                </div>
                <h2 className="text-2xl font-bold text-[#04907E] mb-4">Your Subscription has been cancelled</h2>
                <p className="text-[#6C6C6C] text-sm leading-relaxed mb-8">
                    We are sorry to see you go. If you have any questions about your subscription, please visit the <span className="text-[#024E44] font-bold underline cursor-pointer">Help Center</span>.
                    If you change your mind or cancelled by mistake, you can always reactivate your subscription from your subscriptions page in your Onionloop account.
                </p>
                <button onClick={() => router.push('/profile/account-settings/upgrade-plan/')} className="w-full py-4 text-sm bg-[#024E44] text-white font-normal rounded-lg hover:bg-[#013830] transition-colors">
                    Go to Subscription
                </button>
            </div>
        </div>
    );
};