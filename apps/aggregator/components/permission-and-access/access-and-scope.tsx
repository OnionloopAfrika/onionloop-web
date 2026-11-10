"use client";
import React from "react";

import { Checkbox } from "../ui/checkbox";
import { useState } from "react";

interface AccessAndScopeProps {
  initialScopes: {
    allLocations: boolean;
    groupOnly: boolean;
    branchOnly: boolean;
  };
}

export function AccessAndScope({ initialScopes }: AccessAndScopeProps) {
  const [scopes, setScopes] = useState(initialScopes);

  const handleToggle = (key: keyof typeof scopes, checked: boolean) => {
    setScopes((prev) => ({ ...prev, [key]: checked }));
  };

  return (
    <div className="grid grid-cols-2 gap-[24px] max-lg:grid-cols-1">
      <div className="space-y-[24px]">
        <p className="font-[600] text-[16px] text-[#131313]">Access Scope</p>
        <p className="font-[400] text-[12px] text-[#6C6C6C]">
          Define the data and location this role can access
        </p>
      </div>

      <div className="space-y-[6px]">
        <AccessScope
          checked={scopes.allLocations}
          onCheckedChange={(checked) => handleToggle("allLocations", checked)}
          title="All Locations"
          desc="Can access and manage all locations"
        />

        <AccessScope
          checked={scopes.groupOnly}
          onCheckedChange={(checked) => handleToggle("groupOnly", checked)}
          title="Group Only"
          desc="Can only access locations with assigned groups"
        />

        <AccessScope
          checked={scopes.branchOnly}
          onCheckedChange={(checked) => handleToggle("branchOnly", checked)}
          title="Branch/Location only"
          desc="Can only access their assigned locations"
        />
      </div>
    </div>
  );
}

type ScopeProps = {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  title: string;
  desc: string;
};

export const AccessScope = ({
  checked,
  onCheckedChange,
  title,
  desc,
}: ScopeProps) => {
  return (
    <div className="flex gap-[8px] items-start">
      <Checkbox checked={checked} onCheckedChange={onCheckedChange} />
      <div className="space-y-[4px]">
        <p className="font-[600] text-[12px] text-[#363636]">{title}</p>
        <p className="font-[400] text-[12px] text-[#6C6C6C]">{desc}</p>
      </div>
    </div>
  );
};
