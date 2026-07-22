import StaffManagement from '@/components/staff-page/mega-staff-management'

export default function Page() {
  return (
    <div>
      <StaffManagement leaveRequestPath="/group-manager/staff/leave-request" />
    </div>
  )
}