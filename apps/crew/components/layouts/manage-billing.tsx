"use client"

import React, { useState } from 'react';
import { INVOICES } from '@/lib/mockdata/invoice';
import { CancelConfirmationModal, SuccessModal } from './cancellation-flow';
import Header from './header';
import { useRouter } from 'next/navigation';

const ManageBilling: React.FC = () => {
    const router  = useRouter()
    const [showCancelModal, setShowCancelModal] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);

    const handleConfirmCancel = () => {
        setShowCancelModal(false);
        setShowSuccessModal(true);
    };

    return (
        <div className=" min-h-screen">
            <div className="">
                {/* Header */}
                <div className="flex justify-between items-start mb-10">
                    <Header
                        heading="Manage Billing"
                        subHeading="View payment details, update methods, and download invoices."
                    />
                    <button className="flex-none flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg font-semibold text-sm text-[#363636] bg-white whitespace-nowrap">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M12 8V13" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M11.9941 16H12.0031" stroke="#292D32" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                        Billing Help
                    </button>
                </div>

                {/* Top Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <SummaryCard icon="business" title="Current Plan" iconBg="bg-green-100" iconColor="text-green-600" label="Business Plan" status="Active" details="Up to 15 staff - Unlimited inventory - Priority support" actionText="View Plan Details" onClick={() => router.push('/profile/account-settings/upgrade-plan/')}/>
                    <SummaryCard icon="calendar" title="Billing Cycle" iconBg="bg-blue-100" iconColor="text-blue-600" label="Monthly" details="Next billing date May 28, 2026" actionText="Change to Annual" badge="Save 20%" onClick={() => router.push('/profile/account-settings/upgrade-plan/#annual')} />
                    <SummaryCard icon="send" title="Amount" iconBg="bg-green-100" iconColor="text-green-600" label="₦15,000/month" details="Billed automatically on May 28" actionText="Download Latest invoice" actionIcon={<summaryIcon.download />} onClick={() => router.push('/profile/account-settings/upgrade-plan/')} />
                </div>

                {/* Payment Method */}
                <div className="bg-white border border-gray-200 rounded-xl p-6 mb-8">
                    <div className="flex justify-between items-center mb-6">
                        <div className="flex items-center gap-2 font-medium text-[#363636]">
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1.66602 7.08789H18.3327" stroke="#363636" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M5 13.7539H6.66667" stroke="#363636" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M8.75 13.7539H12.0833" stroke="#363636" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M5.36602 2.91992H14.6243C17.591 2.91992 18.3327 3.65326 18.3327 6.57826V13.4199C18.3327 16.3449 17.591 17.0783 14.6327 17.0783H5.36602C2.40768 17.0866 1.66602 16.3533 1.66602 13.4283V6.57826C1.66602 3.65326 2.40768 2.91992 5.36602 2.91992Z" stroke="#363636" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                            Payment Method
                        </div>
                        <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-[#363636]">
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M5 10H15" stroke="#363636" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M10 15V5" stroke="#363636" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>

                            Add Payment Method
                        </button>
                    </div>
                    <div className="flex justify-between items-center p-4 bg-white border border-gray-100 rounded-lg shadow-sm">
                        <div className="flex items-center gap-4">
                            <svg width="45" height="30" viewBox="0 0 45 30" fill="none" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                                <rect x="0.25" y="0.25" width="44.5" height="29.5" fill="url(#pattern0_4886_53600)" stroke="#C7C7C7" stroke-width="0.5" />
                                <defs>
                                    <pattern id="pattern0_4886_53600" patternContentUnits="objectBoundingBox" width="1" height="1">
                                        <use xlinkHref="#image0_4886_53600" transform="matrix(0.00364299 0 0 0.00546448 -0.000910747 0)" />
                                    </pattern>
                                    <image id="image0_4886_53600" width="275" height="183" preserveAspectRatio="none" xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAARMAAAC3CAIAAAC+MS2jAAAQAElEQVR4AexdC3wVxb3eJORBQiLJIbwNSALaoAINUESQxAptVeAStYrgo1YFRCjYXiqW+gQR6i0WqojKLVgLtNpw5VUlRSOIUAhIECIJCY8AAgl5mBd55367e86e3dmdfZycZzLnN2fOPP8z8818OzP/nd0T3Mo+DAGGgHUEgjn2YQgwBKwjwJhjHTOWgyHAcYw5bBQwBFxBgDHHFdRYnvaOgHH7GHOMMWIpGAJqBBhz1JiwEIaAMQKMOcYYsRQMATUCjDlqTFgIQ8AYAcYcY4xYivaGgDvaw5jjDhSZjI6HAGNOx+tz1mJ3IMCY4w4UmYyOhwBjTsfrc9ZidyDAmOMOFJkMf0LAO3VhzPEOzqyU9oYAY05761HWHu8gwJjjHZxZKe0NAcac9tajrD3eQYAxxzs4s1LchYC/yGHM8ZeeYPUILAQYcwKrv1ht/QUBxhx/6QlWj8BCgDEnsPqL1dZfEGDM8ZeeYPXgEQicL2NO4PQVq6k/IcCY40+9weoSOAgw5gROX7Ga+hMCjDn+1BusLoGDAGNO4PRV4Ne0PbWAMac99SZri/cQYMzxHtaspPaEAGNOe+pN1hbvIcCY4z2sWUntCQHGnPbUm75tS8cqnTGnY/U3a627EGDMcReSTE7HQoAxp2P1N2utuxBgzHEXkkxOx0KAMadj9bfrrWU5lQgw5ijxYD6GgDkEGHPM4cRSMQSUCDDmKPFgPoaAOQQYc8zhxFIxBJQIMOYo8eioPtZuqwgw5lhFjKVnCPAIMObwKLAvQ8AqAow5VhFj6RkCPAKMOTwK7MsQsIoAY45VxAIxPauz+xFgzHE/pkxiR0CAMacj9DJro/sRYMxxP6ZMYkdAgDGnI/Qya6P7EWDMcT+m3pbIyvMFAow5vkCdlRn4CDDmBH4fshb4AgHGHF+g7osyq6qufpt3PmvP8W2ZuRszDq1ZvwfmjXeyYMOLQEQhAZL5onaBV6bHmZOVle0hg272KN4YSVbNzl1fa1YJVbUq6sJ3pZqiLAWiXBDj8Wc2xKW8FjN8VfLkdWlPbX/42S2zl2QuXLkX5uU1+2HDi0BEJd+7AcmQGFmQ8VDOWUvFuZA4N78ka98Z88YtsLhQT3UWjzMnLW1WWtpLvLl7WZrcIFDute5OHvlcUNB9zy16yxOXycJT59NuW5J2/5/sZvqaNEMz6a1/ZR5RQ4yQ3774j7Tp76f9Yr1Zc9vayqqryMhxnAs2RvwzL20LumExqAJiZHxRZIsMTurOJcWHJXXlbDGRmiapWwRvekcgNvNwJTIOf+zjoOuXT336n5iU3Dtk0WVLVn4RNHLt4OkZab/6FObeBTthG5ldK9//xgVAPJHFs8wBQAufe2TA9Tax6j3iuwzoG2U319vsDimEcFwbzSeArWUS+8UN6N1pwA3R//u3gzExD2NaE4twl73pH5/1TO6V2KOL3cR1SuwWoW9Q9NNPjoetNlu/upzYIzQxLow3tgi7DYfKJHWPSbRFcPGhP7i+r1qOYQgmCswYw+//67otx3iexIeBMzCGGYkEYUEN4E9SDJfUO+KrYyWYlPqmrZ0wfT2RzDVvbn5JzI/fX/Fh3sC4kIFx4aKJiwrjHd2iBuqZ8P3H3DAVu1ZtIlcw4XevNzq686tLni48sa6y8h+fb/vtYw+mXCmvO5VXCttsQa0ttJRBwaGI6hIZlpgcl5a2DBdaeN1lFi39d1RYq0JaS5PCq/TU1DVP/Gli4oC+ymDeh+mL/zH9DQoJSxvTy3Rye0JwBpMMJgpbZ35u0WNLU509j7mfsJBmW9fohF4xCd15wM1loqbC3DX43r+DJKAKR+9cWv7d+RW0KC+He5Y5UmNAodTU4WDR95c3FRSuXvbKz/v07GJMoSBq9VpbGiXhcIA8w2/7PRxuMfx2JSrCUr9eqm58+vE0zdILT5dwoUoSol2UQdPa3FBeWTth7ABNUZqBuGRgngFnkrp1shOGIlwzu8nAqqqKH4+53mRinWR3z9qWENfJEraENExZRIhPvNSh6bna4MI888n03Vl/Pn9h3VtvPHZNTNipvO9r6oPIEs11v5NCURFvv5NBCnHJ/+f3Pu8ZG62RlT7tdA1qmPDjYRpZOO7w0XO2iE7OKKN2ldY1/fDma53pdV2/X7pl+KS3MM/A2BOClnaXm35amiGovCF4UGI3ONpioAk4crEuPDzMKYRAg46wmMUW3pxzrEh0+9b2AXOkBvfpbZs2dcLhA+8UFK56bNoI6hREgCvl5zhxwcYJn8TYoHfe+0RwtsnCcmLrxyfsSzV60fIySksrly6aKA+Ru7d8cjS0tV4eYnfzwu1OxU9j0OAfJChCKJ7b099486PcpGtjnfE0mc4Ugsvigo3P08ANGtCdd7Th++qbXyREyqZfl0h+JL+qDVVwW1ZfMkdqROKAvq8ufgp7IaziFPMPxgEdXOds4xD09cFy6CQcPhd/172/vWv3YH45QS+aEF1R3DLt/tuJQMm778DFqKjOktfu0BEe2oprij0Z5QfNHDh68dH8YudUQ6QEdERIW7wtzUNv6IEld1tkfJt3PvNolXPCcamGcdGRm3efb0s13JXXL5gjNgYdg1Vca+tmYf75Xgw0YzspFNM5/1SxmSw6aRat/NLWNcKZgOjgFlJPAN3ArBkpqLwzi8yF4cLFhMgCBCchUwgTrZrqmofuMN7kjLnrNaSP7RoDmzQQrkNLMrUpf0Nr2N2jZDObqUxkonWbC2zXyNZpUjwqLLnhUCGMMLk5eaUeFw55iE/cfsQcqf2Yfz7YMAuTjxTCzwBOj8IlX7DFRDScyM1TRFv08LoBeRYTQ/DSd3VzZt4lzyR3Hz6ca4vuIg9RuIlBw3GNQeGjhxtsctIfWX2hTKEgUcg06bGyYIN64EfDk0wK1kyGsb58w7G4SNl+T0xnAmExocxuavv1USbNRac/MgdNwf5n8dIpV8rreM7QwXXONsjDcZ0jOx8/XiA4XbT+tOqjxO6R9syqYW0PV/7cMrKXzr2XvQdOa29yIESrXVAPjBhxIyJpZs36PZv3no6NESqpc3mGcHP1pxUkD4d6IDFBa36TJ9J1b8vM1ZhwXKqhLTwo+5u2rix0K2sq0k+Zg7rPnX1fZbFsY01HGdOOSCHc2/lkp/ZdfAg0NNAN7Pj4tEYyomjZeC28Ujf70ZEaWcQgjtu8M19jk4NYQiZCRFNaM4i+EUcNZ/73tqTuRoOYJlwswgW7gdO5OpiR98KaHI0JR8pJVFiGsJREcmCrcySvXPL6yuG/zMHO4YkZo+zaalxBKQiJnJEioSSQ3FYdvG6gn2pQ0ovm5Vc2Y3rkHVpfLFGwluOaG7QiHWHKQZM4yIaGO+LI3xde/9TWXbVrIlPJ/ErhpbUtMAUVXEFJA28uVhbAXKkruFJXWlkLI8vpdGKT88D4RKffugt3nE5eqabm00dYK9uHWWe0gr0a5r/MAQz33jfhckk1v2CDx8jYKRTTufCUi7oXUjeAEpUjDwFyA93A0ud/Ig8h3IeOnNJQD0iJIFw5aCpqmiamXSfFEw5MOGs/yLGv06Q4ncuzTDh4As7Mvjf5/dcmZX9wf+7Hj57/bJZocj968PO37nrzd+MRe12fawq+sxNJKoHf5NxsPz8lBVpyvP5udkK0lm4AUgACbLXRaRfHldaH4KqkzuTNEL9mDn9bo0amy6KhzMlu7ERFFJ4u4ax/DE6+EUUL/XrpdNVD99+qU9SJvDM2HfWAlNMhHJuc4UP6SMGE469/32thwpFk1rbEd43I/vtDZYeefWXhpLvHJ6cM6YelFxTfooE7dezgqekpiN35wSOteQtArednjELp4lxUzkUO/UE8vK4ZEH7T7othnbhWnbkXJHdU2FwpTYeOXTaX0lOp/Jo56NoBN8Tamw5w7S7yxz7bCME9whsPHnTlOO2qNTudugFBlN1Cj2oVjQknfXJ/1NCeTOsnc1eOXT2gP2ikvI1BP/xhsuQjHAvf/JKccIgUKm/pVQ4zyVdb54ItqkhqABLPezL15OdzMR0hO3e4bGBiT2pqo4gPt30D3UBQCGXOQXYgDNuKgZIgr9CV66OVQgzS+jVzUPf77xnOb3XMgQsKQUnw1f48ZLRkcF3M2HTMUpZL5VVznpqsnyXjkwtRESGc+UFzlboR5+8LNaoOKInFCxOg6JTbWJ6lj0vATCIPtOTGdITslZW/1b9A6Mucv+ZobDj12K4iL9HLlHYhC5QEWft9fAYnGPXwZzPhjpH8VkeqIgGuFM45F2za+jFO77N1x/6u0A3ozwzKohN7dMEiR0cov92Kod/JIXIKwnWOSB85fpk8NkpIUHnLr5S/9Bu9bZgqh3aAjsZCO4MsdFtmrsxntGCTJzVybzrg40PT/s6clJTBnLjVwdjSWjWJCGO2ER2ijTlEdJi0Fy7eaoumQ4GilYJKy2tfWvBTZRjpE7ZbsqfT9GnJcVAP6ByRzs27oDg2Spam4U9KsLVlrtCQaD3oD+u/lXQD+gu2+rq6XvHXWCrBai9bEm6YmD5cDLN6JQEueMNGWNie8hSKajyZr3VbhlJh6AYqGlr01lRSRgeFKopbJt09VgrWdBw+eq5nF8cDLSYWbFAP6ByRPnv2O71NDn1ho1k37wTm5pfsPsrrBlCcnnoA0RwXHhHx0uyUshqlBl+vXU1fYx4W8vrE8nfmAJR70sfwhwngEo1j+Io+yQZncEsU3piokK9z8uEwaaAbgF7BnthoZkCymoageXNvAaXh1jFbPjnKb3KQQkcmYiWje0S64vtaKaFJBzTRvr0qv7fxP/yjOMrqalKorLbpkTuvS7mxB9TNyuRUH5QEOd+WUKM9HxEAzLl1VHJlDf+ICH9jh75gk7DqHNn522/PSV59B8YWdANdughnmRUzgzKfjK64ufnkL7Sfmpbn2bdHuYWFcB0KCe3SWVxV1xv1lOrynBQf9tDTf5VXyZtu3G9ZsSEXymipUHCGtmADYab8NBkXI1u40NFSHroDSoIvDvjyfqhRf9Cr7rUYYaujfABYNo6JamDaiYoI+vtm7XfQEInhtesG4NIZ1oiVGf2DamJCXhUWLztwrS+8tYU/Iv0z6j1QyOwaHQ7bmmltOXK27vFnNljL5abUGzKybd27mhQ2tFen5EH8mvy+1P7Y8Chyqa4IUmxmvuxenxTqLUcAMAeXorHj+kF3ZsdEuDzb3cofLNjEgMriZlzzRLe+/eKSj0jdgM4oDwouvFz94gLqyWiprMOHFTolKZx2EqfR6Ih0v14R5ZWWF2y2zlzGF0WjJ67kFX3OSnjD9epfjmsqozHtYPKR1wBLtZn32e9iDb0+tqbZwpjEVkouyptuC7X0ZrWIsqZMGX2lTBg39NlGkcXcgzpZWdmXy2TLA3AGayqFIJkHRcNwHO2paVlSbu+B0071gBRBFw71gP4R6ZEjb5bEUB1al2eQp6SiLmnUqtdWbKFmdHdE1r4zRVXKvb5Qe8+WdwAAEABJREFUBMEZIYwr/b7hwcn24+HDb+peWt8qhjttrXYJsU2nzvpsqxMYzBk2ZJB9qyMAxlvCIOYdqi8WbCYf1NmwaVePuBCVAGpAaUXd6pcN7n6Kmfkj0rgHKnpEG7QUHZq27hFp5Bg6uEdpVbPmyEOsgWltSbretvyD3KCblm/MOGSQ2B3Ra/52SFJGa8qTGlJf3/DAbb2wrBCT8efE6xr5Da3o17WhJNhzqFg3iQcjA4M5qanDuRrZVsdowQYlQXbOBT3YOA7LuXfX5Nh1A0RSyiivOFup89S0JAOSoUWQvKRDS7j+EWlIwO38pD5aLxVBnDmDySepKzd7SebAscuJG5TmBJhNBaXLpsxCuW6AyIkFmxSCqWna5B9IXlBoYG+zt4+hJNi5z+NvIZXqRjgCgzmo9J2Tb64R349Dn22QTDRdIsO2fLxHdNPsv238F39ugIjGsKasqWoaQ2bNG4euJXKovXpHpLWE19RcnUg/Ii3Jf/k3PyssrZOu1lK4wkFd2HD8RrG1xRbJ9/jEORngT9ae45wHPus+OpbQS/WwhqMgsv6NwXePt29yxCRTUvtj50NOO5R2HTnts7d58DiKNfZze+KdKVdrZbfkUV1dCp06UYVrP1LRzOt/+pTUDciTgkJyL8ddOl/yy0cNzg2IOU7knekp3QMVg0RbJVMMhnpA54i0mAb21PQUq8cIkMtulFhBYY3wtCc2357+Bq8GhMd9ZtF73+hMOFI5oBCWajMnD5JCRMfQQVam1ohQXykJAoY548aNdD4iinFgtGDjYjqf/476JtVDOWcLzyt5KPabaGvNDDcPuS5lSD8xXt/O3JWjn4DQsGEDo3NEWi7qo9XTCi/JnpOVx0luyuWZjwdogI538V/w51xJQ/KkDb9f6jblAb+PCjU+3yku2Ipqgx6/l3z74ZAbEzSUBHx9Nb7Y6vjq9WsBwxws9DnOgv4eSgKqapjj1qzeRNUNaM0M0A0smKX3KI68V+1HpOVBcrealpXVQuvkibTdqWMHL5p5qwvqaV6cjDO81/FN6s69+VFuXMprblm8LV9/jNcNtMo0lo6CpF/MNqIb4159MeJv7EBJgBREhVu0e99Xr18LGOYAySdmjLFvdeARDQGuGMhxuLEDJcGZs5ccAYpfrOKougF5QhmFKopbdJ6almcyuHMikynmwiYnLW2g6DZjv7Jw0uiburlIHrEAFWjY/MCkPb69jZPPoZyzR05dDgvRo41YBdjl9cHz7yMnHITDDL0umt+VwWVkoCTYvNvFR4CNZBvEBxJzxo0b5tzqoPux9tBtHe1BnS3b9mjoBghRspkBE87i58cQ8TQvf0Ra/YI1IjWEOyiETY7OEWkin+jdsvGZmwd11yMP5fLMZ6eDJk4+bfnDgtXr9ybYqLoBvnTHF9MObuOk/yTREaD4vffH/cmjn4p4heekj16/FkjMGfWjZOdWR0IPFJLcMgfUazs+1j73+cKr/2eLUt1uk+Ul9iFQRj/6sPG5AVGA4oi0GETYDs6IwbgHqnNEWkyjtj/LmHfnmISC4kp1lF4IBSspC2ae7G8vjp64Ugox78BMvnb7eeeEo7tgg1hMLLQ16hDp4W2iwtpXBN88WR1IzElU/8cG/QqKBRvHharXTlhRFBbR38OCLpUbYZSnP3Bjn95mX2HhPCItl6PpFoRzukekNfOJge+/PXPp7DEFBS6pZYkRKUoUbFtk8Inval0gz9qN/zF/UA1LtZnp1FeZJibE8EoCeucKNbVb2Cz55MnqYHv5AfLjfI8UKkzvfkTyJqrxXBG51dHTDfB5HF8Ma6ypOK6wuHbOjAmOUONf8og0LYcgXIi82sc0LYX0TuvZ+ZOyM5/Csg3GGSq6tC/PQpzRiLQJ5LF6VPTlNftjw8y+eRRLtQfThwu10bD4uUhUEqgjVe3CVudIng9evxZgzBG2OiptMoVC6gd1sKJ4d002FnJ8jwh/bsE7dL9dw4L5Ewy6aaRI/t6ImfPBoKWQB+qBh36muA8oBFuwoJu6cuzVWdNGmZ18KFgRRYI8a3ecMn/UIGvfmXJOeO2oXBBlwdbQxMlP3MhzSO7xN0fzh6ZBchMV9snr1wKMORpbHYAr4a10QL325X7FIxzQDcRYedNfaVXL0kXUv/dQlsb7oAcH03iXuS/UA6ON3iJtRhIUbgX759w00FZwwfTizWhE4m7Pw8+avc/D/70H7Y1qqgYUVTXIT9yo4vmAcSP7mz80XVofcoF+744X54FvgDGH3+pEdXLioNv9URFBGTtOOBNzHHQD8d1MP+ze3ADdgJmDalIRew+cjoiKkrwGjpCw0qpq/SPSBhJk0UAmY/2s7C1PXduzi50/qoWNMzn9cuNM04l/voi/s+kM0nZhps3MPufUDWinkoU2BhMnbmRxduetI/rxWx3RR/SyRruaTp41fckQZbbZDjDmoL1PTBfeIwWX3BDgSlGVV7FCE33o4MJjykPpugu26uqr83473sxBNVE+bP6INPHvogjVNOKCrbJ5EP0t0pr59AOxeIPaTcEfdQYaVkTKpjpbTOTzK3YRwWrvhozDCT0pf+emWrBBNzD/nv5qIUTIwH7R9hATJIeS4Mg3isWFPa8nfwKPOdjqkO+R0gE3ijt06LgI4Dt/yezR3+w5XGS5fKb6SRNPTSOlaEBRvSPSYiKlnTgw1hIzlbmpPpE/n3/wcGTw1YJLZdrpAJoJChWUNOCKoy1BCEWrF687ERak8TSOEE9apbV10/7rJjJU5e8jak1M1BBZ46Ij/3OUetIKCTxh/I85Rq1MHZdif4+UUUrEQ0lwIp9/HwA6+I1lO+y6AUSYMLdMGMIreUykFJPwR6Q7C8oljeWEmERhQz0w8XbtW4GKdK56UscOztn90obl9xecU6mezI1IlBwb1Yl/1RtcFAMtQmwX4aAabQJXTTsgNkWYIviBkd3q6x2EJCqsQnjTAW+/fi3wmIOrUY/+KgUW5QoKJcHhwyfRIVu27dHWDVD6u7C06UUTT01DsmRO5J2xpB64VN1o5oi0JN81x9T0lPP7FsTHRpaqVJK8QGJE8kGyr/DvVLl5ek86Pb9qLxZ1sjx6TizVVsww8XCrICN1VIJdSYDOFUJ0rSYvKwkCjzmA77FpI8y8RwopMcl8tucUHP+z4iMLugFkqKkz89Q0Ekomc1eOBfUAn62zySPSfNo2fHGt+Wrr3NQbryHJY2JEghUXS6g3jnFbueCK7IlDymVIqntUSMuO3WenPv1PM+afn+Tyf7lD47Zy2sFWx8uvXwtI5ky4YyT5cLXYOSqUW1saC8+WZWVlf51XB7eYirRV/Q1l9OKFd5DJjPwZH5+JktQDyn7Vzmr6iLR2douh0LzZhHdj2fOpsLKHq36KioUlqCocAa+/m23qoJpjwRbWics7f/WrYyVmzJkS5clRowp7+fVrAckcjfdIoRspV9DEfnHPLHgnsa981CC1noEy2vxBNVEQf8wnVHb1FUN1bUtHpHUlmY18d+lEDYWB/ogUFmyaBWB1xD81bVo3IAoBedQmPDwMBuGwJSOm523UkNK5fKzwhZJg54ErgtNLlreZ45ZmQR81bEQvhSiAq/A7PZhqKmvs/wIAtzOC4oIy2tJBNVEMf0Q6ir8BInp5W3faqalrtnpEmpfZtm/K0AEc8YcIRiMSBXYJEd46BJfSfLjtG7tuQB6umsDlkTR3q6ijp0XTwpUI7873qpIgIJkDJO8hXpmLINFoUUgkTFCw4y3PYkq5Levvy2XNlg6qiWIOHvymZ6zjFoQYpGtDPeDCEWldkcaRuOJwcj2BFlaElNLalsE3aP8Z1vxVB7ALItJTvY4FGzWBEKFHIZDcoMJN3nyyOlCZ43xlroC43QK4dhf5I5KHDFX7W5oTE7qYP6gmCdj+eVFUqHJdLsVpOzrz/0inHeWpUKyvOM1Fq+6I7Ns7Vl0hXhkdJiij1XGuhoiPWGvn1q2hmAVKAm8+WR2ozNHY6pgAFxDrU6i0Juil5/4LyayafTu1XuqpXE4oZRofkeYHujJPG338cO+mpAFAo19uUFx5Q/D1A+LgIMyrK/9NnXBkEziRS8erN9vIs6HCcq8S4SP53juDE6jMwcJj7Lh+5MPVIqYEuGKgYBsu2KAbMPx7D0GSwuLvssd04h8Aphctz4BNjpkj0n37LHlq/hpeuDyzq27wcObz2xTqNTOiGjh+d6RMiSrtO2nxoTpIcMuCDXIohlcSePH1a+5lDqVNngmeMmW08+FqsQgMXPoVVH+2gQDoBhb+bgw4Cbclwx+RjlWdsaeLqKupMTwijYHOJYRu3pmfPGHV7elv7Nz1NV2ecQzG+k0T3026VjnhSPkAGqCTvDJH2uAwNSDvbjoSKz93K0vfRmcbF2xHLjZVVcl3cm2sjl72AGYO/8rc4hq9xlHiaBS6fKb+l49NomTSC1YckSaGoHI5IUqpaA0zPCJ9/NsiLrQ1KqpzYo/QovNXfjJjY1DsbExBoBBPKlGQCRvq8vnP/iV57CpbuPa7Y8h3AspkQj3wxHTyD7YwNFdsyKUu1cTstAWb7rTjjgVbU/6pYrEKnrYDmDnUfTz9CgrO6CzY7px8XaL6gW0TPbBx89d29QCKNpGeM3FE+vDRc/L3EibaIhIH2TAFgUJ9b1ne7cbnHp759tvvbQeRcCMfUwroJBl4Ef7aii1DbnshKW3VX7edTEoyofcjOM9x5dXBU9NTiAZtyMjWUEYTidrm1aOQLsK28KD8Qi/d1Qlg5qB3nK/MhUc0qu4Xgw3twvNXfzXnXsNk6gS4BlcUC1om00UnDohSL4EIyVs+Odo1UtY7gnB+CgKFeoZ3jeq048uiRW/sBZGG3/MmVnSgk2SS71qJ8NfX7q9tCk3qE+38m0StCdBermpEYsJZ8euR9ljZz8KV5g6q0aYdmSi1E5wJCglTh9tDBBDsbvmPrF27v/bSoelgeQUCzq3xylypDTSUOezkQzH5cMQnKsLqQTVRAP8UA3EAlSha1q/IAvXAxPHOd5AjRNPsO3BRM1wKBHlg+LlI4BIYktgzHAaOpO4xME7CSHloDqLCjmTznkx1OO2/WXuOQ9tm95j7aWgOUZgmrkHXlNU2IUF9fQMcoq1RDqXCUBJ8mHVGI70HgqwwxwPFt1Gk4pW5clmqK6gUqcEZjiu58v3qF029M1qSIzlOFFxWHJGmFy1mgXrA8Ig0lluc5kvbIJwyaAyu1mLZhrZDeEFJw6blP1EnX/ne7qRuyqMS6kSyEHBm9I3x96T1NW8evqO3mFh0wO4fL/unFtQQIMiKIJyl9SFYBRCBnvAGNnOE52dUG1+AawIqOYUqi5unTf2ZiUwaSTJ35di6OgYTrWjZtAP1gOERaSjrbNGqh/BowjUqRQ+S1YRM5BiRWKfNnzpUPQNjH7V5v5UbJi3NRRcr31l65x9fuLstZu4jIzD/kLUl0HC2y0uvXwts5gDN9Adu0Y2pZkgAAAdXSURBVL6rgzgCXIQ4jFxPUF3b8MSM4YYbD0dW8jfjY63lAb1orqROIDwpR+7PzrkQ2kp/8zpdODYJmHzkosy6HTJBm6H9IjDQ1RnfXr/Xqm5g/IgeLgMrVWDY4B7OdxKIoQ6Siz65DSVBXqHymXl5tPvcAc+c8Wk3kHd1RHTo4MpnG6S9fKZ6/vxpcLhgCk+d54gj0hiC9KJRxMTJN8DWN1s/K4QyQDsNXbiLnJEVU3qVA20+y5gnC3M6F687YZMrLZwx2q7SylpMF9pxVkL7iE9WS1mAsORWOaJCWrL2808Bq2LcHBDwzNHe6uiCK0EoUmjYiFjDSUDKQjgKT5dwxBFpIoXkFZYTUA+MHpkkhWk6sEwvPFmuGaVz70We3oBCQk3k6UU39japN15Do83GjENWJxwote9W/quUWJALtuLJaik/0ctCu8Iju3jnyWonc6T6BJbDYNAT4MraJi7YCstbfz3fFWW0KOngwW+6hmlhiJlBq+hL1Y2GR6TzcS9PUz0gFinaWsLFGCzYRIcluyC/fMUzYzLWz6Llen7FLvvdT/oTO/K8Da1hv7yrrzykLe4f3WyzP1ktSQHCklvlwJZMFebmAK1ed3MRHheneGWuVBrGFh1ccbbhyXOx2uTfe0iC5Y7tnxc51QNSBIqW3ISjstnwiPTBg8d49YDOIys67dLJJa+JcHkWAwoulcXHRubumaPWQYsJYONma0FJA2eOM0gPU1RaOX3KEDjcYobe1F+x1dFBmONs4c1eeP1ae2DOuHGyfwdRdxQdZegGFi91URktlqN9RFqMg00UjfEaE0Ku2pFMaXbsyiutquZoNwQJmcq8ks9gwSakA2ewsdmw/P6vts7Vn7pXr9+bFE+/QSlII62wiNSxg8lAV/3869c03zRNoAGEhSL2HvT4P++2B+ZovDJXgI+3dC7PLY3QDVh9apqX6fgKd106OXyqX1XRNQ1BZo5IL3vx5/OmDiu83Fh4ubKiVjidoJLNBxCDhg+yf/UXbOWVtQUXqjDPbF39aNmhZ9Xna+xSHD/Yd63drvx3J6PJB7qBxY+4bcJBRXC5sV2joq4KYaSEwf3QLw6cgcOjpj0wRzhs1nSlvI40ZbVXYBAOW2VOnau6c/IgdInL+H6xJ4erbCqtqNMw5bWlMIiC7TCXvqszPCKNyuDyv+K1X7SeXZa95de/+eWoqIgQKAwKyxrAopqaqxyGCzgDG0m1jOZsA7bAgDDIAZm5O+dgnjG5fX/zvUwuqAHaaoWprAU9aAa6gSk/bdOb5lFPwowfYjtZ3ogbO3ZT01AGU9vE23BIpqq2rKo2c38Nkd1lLy1je2AO2vbBhjnLXvm5JfPHJVNeX0bdEEOmoRlwXe/V705bumiiSbP6D3eOv93ClThlSL9n50/K2f1SZdHr2f+cvXjerVMmDIoKD+KJdKkeXCosrYOpqGkiTEFxJcJhgyoFBVXxtphZ00atWzH9/L4FJ79aBJkgp2HrpASxcbFvLxy3dO6t5s2KX49MHhQvSXCLY8a0lLfn/nDJjGFmzIoFyVUeftygnTAHu/yZT6ZbMvN/9aClAaTuftxln/n4XZaMMD2qJRmE4GYiWISC3loxA0RqLX+z8tiLudvnfv6XRz5dM3XVy/eAVJKBF8swRCEBqNJavAzTyysLJ2GGcW2CnfHIWKtGR9lg0FR6dOot/WdMH2HSoAIAjS7MDTHthDluQCKgRGBYgPbYgoO92KiAVJKBFyRBFBK4RpWAQsJnlWXM8Rn0rOCARoAxJ6C7j1W+jQi4np0xx3XsWM6OjABjTkfufdZ21xFgzHEdO5azIyPAmNORe5+13XUEGHNcx47l9HcEPFk/xhxPostkt18EGHPab9+ylnkSAcYcT6LLZLdfBBhz2m/fspZ5EgHGHE+iy2R7EgHfymbM8S3+rPRARYAxJ1B7jtXbtwgw5vgWf1Z6oCLAmBOoPcfq7VsEGHN8iz8rnYaAv4cz5vh7D7H6+ScCjDn+2S+sVv6OAGOOv/cQq59/IsCY45/9wmrl7wgw5vh7D7XP+gV+qxhzAr8PWQt8gQBjji9QZ2UGPgKMOYHfh6wFvkCAMccXqLMyAx8BxpzA70P/a0FHqBFjTkfoZdZG9yPAmON+TJnEjoAAY05H6GXWRvcjwJjjfkyZxI6AAGNOR+hl97aRSeMRYMzhUWBfhoBVBBhzrCLG0jMEeAQYc3gU2JchYBUBxhyriLH0DAEeAcYcHgX2dSLAXOYQYMwxhxNLxRBQIsCYo8SD+RgC5hBgzDGHE0vFEFAiwJijxIP5GALmEGDMMYdTe0nF2uEuBBhz3IUkk9OxEGDM6Vj9zVrrLgQYc9yFJJPTsRBgzOlY/c1a6y4EGHPchaQ/yGF18B4CjDnew5qV1J4QYMxpT73J2uI9BBhzvIc1K6k9IcCY0556k7XFewgw5ngP67aWxPL7EwKMOf7UG6wugYMAY07g9BWrqT8hwJjjT73B6hI4CDDmBE5fsZr6EwL/DwAA//9M49hnAAAABklEQVQDACatPlNRPE6MAAAAAElFTkSuQmCC" />
                                </defs>
                            </svg>

                            <div>
                                <div className="flex items-center gap-2">
                                    <span className="text-sm font-medium text-[#363636]">Visa **** 4242</span>
                                    <span className="text-[10px] bg-[#B5E3C4] text-[#04802E] px-2 py-0.5 rounded font-medium">Primary</span>
                                </div>
                                <p className="text-xs text-gray-400 mt-1">Expires 08/29</p>
                            </div>
                        </div>
                        <button className="flex items-center gap-2 px-4 py-2 bg-[#A5D6A7] text-[#024E44] rounded-lg text-sm font-semibold">
                            <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M10.5261 1.94375L11.9927 4.87708C12.1927 5.28542 12.7261 5.67708 13.1761 5.75208L15.8344 6.19375C17.5344 6.47708 17.9344 7.71042 16.7094 8.92708L14.6427 10.9937C14.2927 11.3437 14.1011 12.0187 14.2094 12.5021L14.8011 15.0604C15.2677 17.0854 14.1927 17.8688 12.4011 16.8104L9.9094 15.3354C9.4594 15.0688 8.71773 15.0688 8.2594 15.3354L5.76773 16.8104C3.9844 17.8688 2.90106 17.0771 3.36773 15.0604L3.9594 12.5021C4.06773 12.0187 3.87606 11.3437 3.52606 10.9937L1.4594 8.92708C0.24273 7.71042 0.634397 6.47708 2.3344 6.19375L4.99273 5.75208C5.4344 5.67708 5.96773 5.28542 6.16773 4.87708L7.6344 1.94375C8.4344 0.352083 9.7344 0.352083 10.5261 1.94375Z" stroke="#024E44" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                            Set as Primary
                        </button>
                    </div>
                </div>

                {/* Billing History */}
                <div className="mb-12 border border-gray-100">
                    <div className="flex justify-between items-center mb-6 bg-white px-3 py-5">
                        <h2 className="text-xl font-medium text-[#363636]">Billing History</h2>
                        <button className="text-[#04802E] text-xs flex items-center gap-1">
                            View all invoice
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                <path d="M12.0254 4.94141L17.0837 9.99974L12.0254 15.0581" stroke="#04802E" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M2.91602 10H16.941" stroke="#04802E" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                        </button>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="text-[#6C6C6C] font-normal text-sm border-b border-gray-200">
                                    <th className="pb-4 text-[#6C6C6C] font-semibold text-sm px-2">Invoice ID</th>
                                    <th className="pb-4 text-[#6C6C6C] font-semibold text-sm px-2">Date</th>
                                    <th className="pb-4 text-[#6C6C6C] font-semibold text-sm px-2">Amount</th>
                                    <th className="pb-4 text-[#6C6C6C] font-semibold text-sm px-2">Status</th>
                                    <th className="pb-4 text-left text-[#6C6C6C] font-normal text-sm px-2">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="text-sm">
                                {INVOICES.map((inv, idx) => (
                                    <tr key={idx} className="border-b border-gray-100 group bg-white">
                                        <td className="py-5 px-2 font-semibold text-[#6c6c6c]">{inv.id}</td>
                                        <td className={`py-5 px-2 font-normal ${inv.isCritical ? 'text-red-500' : inv.isWarning ? 'text-orange-400' : 'text-gray-500'}`}>{inv.date}</td>
                                        <td className="py-5 px-2 font-normal text-[#131313]">{inv.amount}</td>
                                        <td className="py-5 px-2">
                                            <span className={`px-2 py-1 rounded-full text-xs font-normal ${inv.status === 'Paid' ? 'bg-[#E7F6EC] text-[#04802E]' : 'bg-red-50 text-red-600'}`}>
                                                {inv.status}
                                            </span>
                                        </td>
                                        <td className="py-5 text-left px-2">
                                            {inv.status === 'Failed' ? (
                                                <button className="text-gray-600 font-normal text-sm hover:underline">Retry</button>
                                            ) : (
                                                <button className="text-gray-400 hover:text-gray-600"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                                    <path d="M12 8V2L10 4" stroke="#363636" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" />
                                                    <path d="M12 2L14 4" stroke="#363636" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" />
                                                    <path d="M7 12C3 12 3 13.79 3 16V17C3 19.76 3 22 8 22H16C20 22 21 19.76 21 17V16C21 13.79 21 12 17 12C16 12 15.72 12.21 15.2 12.6L14.18 13.68C13 14.94 11 14.94 9.81 13.68L8.8 12.6C8.28 12.21 8 12 7 12Z" stroke="#292D32" stroke-width="1.25" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                                                    <path d="M5 11.9991V9.99906C5 7.98906 5 6.32906 8 6.03906" stroke="#292D32" stroke-width="1.25" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                                                    <path d="M19 11.9991V9.99906C19 7.98906 19 6.32906 16 6.03906" stroke="#292D32" stroke-width="1.25" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                                                </svg>
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Footer Banner */}
                <div className="bg-[#E3EFFC] rounded-xl p-6 flex justify-between items-center border border-[#E3EFFC]">
                    <div className="flex items-start gap-3">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                            <path d="M9.99935 18.3327C14.5827 18.3327 18.3327 14.5827 18.3327 9.99935C18.3327 5.41602 14.5827 1.66602 9.99935 1.66602C5.41602 1.66602 1.66602 5.41602 1.66602 9.99935C1.66602 14.5827 5.41602 18.3327 9.99935 18.3327Z" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M10 6.66602V10.8327" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M9.99609 13.334H10.0036" stroke="#292D32" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                        <div>
                            <p className="font-semibold text-[#131313] font-sm">Automatic Billing is on</p>
                            <p className="text-xs text-[#6C6C6C]">Your subscription renews automatically every month. You can cancel anytime</p>
                        </div>
                    </div>
                    <button onClick={() => setShowCancelModal(true)} className="px-3 py-2 bg-white text-[#CB1A14] font-medium border border-gray-200 rounded-lg shadow-sm text-sm">
                        Cancel Subscription
                    </button>
                </div>
            </div>

            <CancelConfirmationModal isOpen={showCancelModal} onClose={() => setShowCancelModal(false)} onConfirm={handleConfirmCancel} />
            <SuccessModal isOpen={showSuccessModal} onClose={() => setShowSuccessModal(false)} />
        </div>
    );
};

// Sub-component for Cards
const SummaryCard = ({ title, label, details, actionText, actionIcon, badge, iconBg, iconColor, status, icon, onClick }: any) => {
    const IconComponent = summaryIcon[icon as keyof typeof summaryIcon];
    return (
        <div className="bg-white border border-gray-200 rounded-xl p-5 flex flex-col justify-between shadow-sm">
            <div>
                <h3 className="text-sm font-semibold text-[#131313] mb-4">{title}</h3>
                <div className="flex items-start gap-3 mb-4">
                    <div className={`p-2 rounded-lg ${iconBg} ${iconColor}`}>
                        <IconComponent />
                    </div>
                    <div className="flex-1">
                        <div className="flex items-center gap-2">
                            <span className="font-medium text-[#131313]">{label}</span>
                            {status && <span className="text-[10px] bg-[#B5E3C4] text-green-700 px-2 py-0.5 rounded font-medium uppercase tracking-wider">{status}</span>}
                        </div>
                        <p className="text-xs text-[#6C6C6C] mt-1 leading-relaxed">{details}</p>
                    </div>
                </div>
            </div>
            <button onClick={onClick} className="w-full py-2.5 border border-gray-200 rounded-lg text-sm text-[#363636] font-medium flex items-center justify-center gap-2 hover:bg-gray-50">
                {actionText} {actionIcon ||
                    (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M14.4297 5.92969L20.4997 11.9997L14.4297 18.0697" stroke="#363636" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M3.5 12H20.33" stroke="#363636" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
)}
                {badge && <span className="text-[10px] bg-[#B5E3C4] text-[#04802E] px-1.5 py-0.5 rounded ml-1">{badge}</span>}
            </button>
        </div>
    )
};

export default ManageBilling;

const summaryIcon = {
    download(): React.ReactNode {
        return (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 8V2L10 4" stroke="#363636" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M12 2L14 4" stroke="#363636" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M7 12C3 12 3 13.79 3 16V17C3 19.76 3 22 8 22H16C20 22 21 19.76 21 17V16C21 13.79 21 12 17 12C16 12 15.72 12.21 15.2 12.6L14.18 13.68C13 14.94 11 14.94 9.81 13.68L8.8 12.6C8.28 12.21 8 12 7 12Z" stroke="#292D32" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M5 11.9991V9.99906C5 7.98906 5 6.32906 8 6.03906" stroke="#292D32" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M19 11.9991V9.99906C19 7.98906 19 6.32906 16 6.03906" stroke="#292D32" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
            </svg>

        )
    },
    business(): React.ReactNode {
        return (
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8.00065 12.1341C9.47341 12.1341 10.6673 10.9402 10.6673 9.46745C10.6673 7.99469 9.47341 6.80078 8.00065 6.80078C6.52789 6.80078 5.33398 7.99469 5.33398 9.46745C5.33398 10.9402 6.52789 12.1341 8.00065 12.1341Z" stroke="#04802E" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M6.96094 9.53419L7.39427 9.96753C7.52094 10.0942 7.7276 10.0942 7.85427 9.97419L9.04094 8.88086" stroke="#04802E" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M5.33387 14.6667H10.6672C13.3472 14.6667 13.8272 13.5933 13.9672 12.2867L14.4672 6.95333C14.6472 5.32667 14.1805 4 11.3339 4H4.6672C1.82054 4 1.35387 5.32667 1.53387 6.95333L2.03387 12.2867C2.17387 13.5933 2.65387 14.6667 5.33387 14.6667Z" stroke="#04802E" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M5.33398 4.00065V3.46732C5.33398 2.28732 5.33398 1.33398 7.46732 1.33398H8.53398C10.6673 1.33398 10.6673 2.28732 10.6673 3.46732V4.00065" stroke="#04802E" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M14.4338 7.33398C13.2805 8.17398 12.0005 8.76065 10.6738 9.09398" stroke="#04802E" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M1.74609 7.51367C2.85943 8.27367 4.07276 8.81367 5.33276 9.12034" stroke="#04802E" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
        )
    },
    calendar(): React.ReactNode {
        return (
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5.33398 1.33398V3.33398" stroke="#0D5EBA" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M10.666 1.33398V3.33398" stroke="#0D5EBA" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M2.33398 6.06055H13.6673" stroke="#0D5EBA" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M14 5.66732V11.334C14 13.334 13 14.6673 10.6667 14.6673H5.33333C3 14.6673 2 13.334 2 11.334V5.66732C2 3.66732 3 2.33398 5.33333 2.33398H10.6667C13 2.33398 14 3.66732 14 5.66732Z" stroke="#0D5EBA" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M10.4625 9.13411H10.4685" stroke="#0D5EBA" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M10.4625 11.1341H10.4685" stroke="#0D5EBA" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M7.99764 9.13411H8.00363" stroke="#0D5EBA" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M7.99764 11.1341H8.00363" stroke="#0D5EBA" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M5.52889 9.13411H5.53488" stroke="#0D5EBA" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M5.52889 11.1341H5.53488" stroke="#0D5EBA" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
        )
    },
    send(): React.ReactNode {
        return (
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6.33398 9.16682C6.33398 9.81349 6.83399 10.3335 7.44733 10.3335H8.70064C9.23398 10.3335 9.66732 9.88015 9.66732 9.31349C9.66732 8.70682 9.40066 8.48682 9.00732 8.34682L7.00065 7.64682C6.60732 7.50682 6.34066 7.29349 6.34066 6.68016C6.34066 6.12016 6.77398 5.66016 7.30731 5.66016H8.56065C9.17398 5.66016 9.67399 6.18016 9.67399 6.82682" stroke="#04802E" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M8 5V11" stroke="#04802E" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M14.6673 8.00065C14.6673 11.6807 11.6807 14.6673 8.00065 14.6673C4.32065 14.6673 1.33398 11.6807 1.33398 8.00065C1.33398 4.32065 4.32065 1.33398 8.00065 1.33398" stroke="#04802E" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M14.6667 4.00065V1.33398H12" stroke="#04802E" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M11.334 4.66732L14.6673 1.33398" stroke="#04802E" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
        )
    },
}