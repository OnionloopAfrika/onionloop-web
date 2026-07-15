import ProfileLayout from "../Shell";


const page = () => {
    return (
        <ProfileLayout
            active="/cashier/settings/request-leave"
            heading="Request Leave"
            subheading="Submit a request to take time off"
        >
            <div className="space-y-8.75">
                Leave Request
            </div>
        </ProfileLayout>
    );
};

export default page;
