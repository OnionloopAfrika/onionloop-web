"use client";

import { useState } from "react";
import Select from "../ui/select";
import { ProfileHeader } from "../profile-header";
import MultiSelect from "../ui/multi-select";
import Textarea from "../ui/textarea";
import Button from "../ui/button";

export function BusinessCategory() {
  const [selectedRole, setSelectedRole] = useState();
  const [selected, setSelected] = useState<string[]>([]);
  const [bio, setBio] = useState("");

  return (
    <div className="space-y-[40px] bg-white p-[24px] rounded-[12px]  shadow-[0_0_15px_rgba(0,0,0,0.15)]">
      <ProfileHeader
        title="Business Category"
        subtitle="Help us tailor your experience"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-[32px]">
        <Select
          label="Industry"
          placeholder="Food & Groceries"
          value={selectedRole}
          //   onValueChange={setSelectedRole}
          options={[
            { value: "admin", label: "Administrator" },
            { value: "editor", label: "Editor" },
            { value: "viewer", label: "Viewer" },
          ]}
        />

        <MultiSelect
          label="Category"
          options={[
            { value: "react", label: "React" },
            { value: "next", label: "Next.js" },
            { value: "ts", label: "TypeScript" },
          ]}
          value={selected}
          onValueChange={setSelected}
        />
      </div>

      <Textarea
        placeholder="Add more..."
        value={bio}
        onChange={(e) => setBio(e.target.value)}
      />

      <Button variant="primary" size="save">
        Save Changes
      </Button>
    </div>
  );
}
