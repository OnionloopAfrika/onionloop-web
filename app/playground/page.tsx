
const page = () => {
  return (
    <div className="w-full max-w-150 mx-auto p-6">
        Playground for this application. In this page return all custom ui components only. e.g Buttons, Input field, singleSelect and multipleSelect. Modal, date picker, switch, day picker etc.
        <br />
        <br />
        All components should have default variant as well as variant when specific variant props are passed to it.
        All components should have default size e.g lg, md, sm. and different style for different variant
        <br />
        UI Documentation & Component Playground1. 
          <br />
          <br />
          1.Design System Overview: They follow a strict size and variant hierarchy to ensure consistency across the admin dashboard.SizeUsagesmTables, tight sidebars, or condensed forms.mdStandard UI interactions (Default).lgFeatured actions, Login/Auth pages, or Hero sections.
          <br />
          <br />
          2. Actions Buttons The primary interaction element. Supports multiple visual priorities.Props:variant: "primary" | "secondary" | "outline" | "ghost" | "danger"size: "sm" | "md" | "lg"isLoading: boolean, Disables interaction and shows a spinner
          <br />
          <br />
          3. Form Inputs
          Used for data entry. Includes standard text inputs and specialized pickers.
          <br />
          Text & Select Inputs
          Standard: Default border and focus states.
          <br />
          Error State: Applied via the error prop or a status="error" variant.
          <br />
          Disabled: Standard gray-out with not-allowed cursor.
          <br />

          Multi-Select & Single-Select
          These custom components extend the native select functionality with searchability and tag-based selection.
          <br />
          SingleSelect: Replaces native select with a custom searchable dropdown.
          <br />

          MultipleSelect: Allows "Chip" or "Tag" selection with a clearable "X" icon.
          <br />

          <br />
          <br />
          4. Overlays & Modals
          Components that sit above the main UI layer.
          <br />

          Modal: Center-aligned, requires an isOpen state and an onClose callback. Supports initialFocus for accessibility.
          <br />

          Popover: Used for settings menus or small contextual tooltips.
          <br />

          DatePicker: A popover containing a calendar grid for selecting specific dates.
          <br />
          <br />
          5. Control Toggles
          Small utility components for binary choices.
          <br />

          Switch: A high-visibility replacement for checkboxes, ideal for "Active/Inactive" settings.
          <br />

          DayPicker: A multi-select grid used specifically for selecting days of the week (common in scheduling logic).
          <br />
          <br />

          6. Playground Live Preview
          Use the section below to verify component behavior in real-time.
    </div>
  )
}

export default page