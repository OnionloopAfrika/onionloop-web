import StaffManagement from '@/components/staff-page/mega-staff-management'

const page = () => {
  return (
    <div>
      <StaffManagement leaveRequestPath="/super-admin/staff/leave-request" />
    </div>
  )
}

export default page