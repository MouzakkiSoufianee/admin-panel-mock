import OrganizationInfo from "./sections/OrganizationInfo";
import QuickStats from "./sections/QuickStats";
import QuickActions from "./sections/QuickActions";
import RecentProjects from "./sections/RecentProjects";
import RecentActivity from "./sections/RecentActivity";
import ChatbotConfig from "./sections/chatbotConfig";


export default function Dashboard() {
    return (
        <div className="p-4 sm:p-6 bg-gray-50 min-h-screen">
            <h2 className="text-lg text-black font-semibold mb-4">
                Overview of your organization and recent activity <span role="img" aria-label="wave">👋</span>
            </h2>
            <div className="grid grid-cols-12 gap-4 md:gap-6">
                <div className="col-span-3">
                    <OrganizationInfo />
                </div>

                <div className="col-span-6 flex flex-col gap-4 md:gap-7">
                    <QuickStats />
                    <ChatbotConfig />

                </div>

                <div className="col-span-3 row-span-2">
                    <div className="flex flex-col gap-4 md:gap-6">
                        <QuickActions />
                        <RecentActivity />

                    </div>
                </div>


                <div className="col-span-9">
                    <RecentProjects />
                </div>
            </div>
        </div>
    );
}