import DialogManager from "./components/dialogs/dialog-manager";
import Header from "./components/header";
import RightSideDrawer from "./components/right-side-drawer";
import SideMenu from "./components/side-bar";
import { Toolbar } from "./components/toolbar";
import { Toaster } from "./components/ui/toaster";
import FlowZone from "./flow-zone";

export default function MainLayout({ parentThis }: { parentThis: any }) {

    return (
        <div className='min-h-screen flex flex-col flex-wrap' >
            <DialogManager />
            <Toolbar />
            <div className="flex-1 flex overflow-hidden">
            <div className="flex-1 relative overflow-hidden bg-gray-50">


            <FlowZone />
</div>
            <RightSideDrawer />
            </div>
            <Toaster />
        </div>
    )
}
