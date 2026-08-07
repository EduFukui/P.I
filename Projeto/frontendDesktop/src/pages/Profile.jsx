import { useState } from "react";

import Sidebar from "../components/SideBar";
import TopBar from "../components/TopBar";
import ProfileForm from "../components/Profile/ProfileForm";

export default function Profile() {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="min-h-screen bg-[#111111] text-white">
            <Sidebar
                sidebarOpen={sidebarOpen}
                setSidebarOpen={setSidebarOpen}
            />

            <main className="min-h-screen p-8">
                <TopBar
                    setSidebarOpen={setSidebarOpen}
                />

                <ProfileForm />
            </main>
        </div>
    );
}
