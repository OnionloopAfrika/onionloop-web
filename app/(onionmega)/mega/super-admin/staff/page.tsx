import StaffManagement from '@/components/staff-page/mega-staff-management'

export default function Page() {
  return (
    <div>
      <StaffManagement leaveRequestPath="/super-admin/staff/leave-request" />
    </div>
  )
}