import OrganizationInfo from "./sections/OrganizationInfo";
import QuickStats from "./sections/QuickStats";
import QuickActions from "./sections/QuickActions";
import RecentProjects from "./sections/RecentProjects";
import RecentActivity from "./sections/RecentActivity";
import ChatbotConfig from "./sections/chatbotConfig";


export default function Dashboard() {
    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <h2 className="text-lg text-black font-semibold mb-2">
                Overview of your organization and recent activity <span role="img" aria-label="wave">👋</span>
            </h2>
            <div className="grid grid-cols-5 gap-4">
                <div className="col-span-1">
                    <OrganizationInfo />
                </div>
                <div className="col-start-2 col-span-2">
                    <QuickStats />

                    <ChatbotConfig />
                </div>
                <div className="col-start-4 col-span-2 ">
          <QuickActions />
          
        </div>
        {/* 
        <RecentActivity />
        <div className="flex flex-col gap-6 lg:col-span-2 ">
        
        <RecentProjects />
        </div> */}


            </div>
        </div>
    );
}