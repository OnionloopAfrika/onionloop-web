export function Settings() {
  return (
    <div className="bg-white rounded-[12px] border border-[#E5E7EB] shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-[24px]">
      <div className="divide-y divide-[#E5E7EB]">
        <div className="flex justify-between items-center py-[20px] first:pt-0">
          <div className="space-y-[4px]">
            <p className="font-[600] text-[14px] text-[#131313]">
              Password Management
            </p>
            <p className="font-[400] text-[13px] text-[#6C6C6C]">
              Send a password reset link to this business
            </p>
          </div>
          <button className="px-[16px] py-[10px] rounded-[8px] bg-[#04907E] text-white text-[14px] font-[500] hover:bg-[#037a6a] transition-colors whitespace-nowrap">
            Send password reset link
          </button>
        </div>

        <div className="flex justify-between items-center py-[20px]">
          <div className="space-y-[4px]">
            <p className="font-[600] text-[14px] text-[#131313]">Placed PND</p>
            <p className="font-[400] text-[13px] text-[#6C6C6C]">
              Place this business on PND(Post No Debit)
            </p>
          </div>
          <button className="px-[16px] py-[10px] rounded-[8px] border border-[#C62828] text-[#C62828] text-[14px] font-[500] hover:bg-red-50 transition-colors whitespace-nowrap">
            Place PND
          </button>
        </div>

        <div className="flex justify-between items-center py-[20px]">
          <div className="space-y-[4px]">
            <p className="font-[600] text-[14px] text-[#131313]">Remove PND</p>
            <p className="font-[400] text-[13px] text-[#6C6C6C]">
              Remove PND restrictions and allow transactions
            </p>
          </div>
          <button className="px-[16px] py-[10px] rounded-[8px] border border-[#04907E] text-[#04907E] text-[14px] font-[500] hover:bg-[#E0F7F4] transition-colors whitespace-nowrap">
            Remove PND
          </button>
        </div>

        <div className="flex justify-between items-center py-[20px]">
          <div className="space-y-[4px]">
            <p className="font-[600] text-[14px] text-[#131313]">
              Suspend Business
            </p>
            <p className="font-[400] text-[13px] text-[#6C6C6C]">
              Temporarily suspend this business account
            </p>
          </div>
          <button className="px-[16px] py-[10px] rounded-[8px] border border-[#C62828] text-[#C62828] text-[14px] font-[500] hover:bg-red-50 transition-colors whitespace-nowrap">
            Suspend
          </button>
        </div>

        <div className="flex justify-between items-center py-[20px]">
          <div className="space-y-[4px]">
            <p className="font-[600] text-[14px] text-[#131313]">
              Reactivate Business
            </p>
            <p className="font-[400] text-[13px] text-[#6C6C6C]">
              Reactivate this suspended account
            </p>
          </div>
          <button className="px-[16px] py-[10px] rounded-[8px] border border-[#04907E] text-[#04907E] text-[14px] font-[500] hover:bg-[#E0F7F4] transition-colors whitespace-nowrap">
            Reactivate
          </button>
        </div>

        <div className="flex justify-between items-center py-[20px] last:pb-0">
          <div className="space-y-[4px]">
            <p className="font-[600] text-[14px] text-[#131313]">Transfer</p>
            <p className="font-[400] text-[13px] text-[#6C6C6C]">
              Transfer this business from being a merchant to an agent
            </p>
          </div>
          <button className="px-[16px] py-[10px] rounded-[8px] border border-[#04907E] text-[#04907E] text-[14px] font-[500] hover:bg-[#E0F7F4] transition-colors whitespace-nowrap">
            Transfer Business
          </button>
        </div>
      </div>
    </div>
  );
}
