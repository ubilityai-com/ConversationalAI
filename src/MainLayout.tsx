import DialogManager from "./components/dialogs/dialog-manager";
import Header from "./components/header";
import RightSideDrawer from "./components/right-side-drawer";
import SideMenu from "./components/side-bar";
import { Toaster } from "./components/ui/toaster";
import FlowZone from "./flow-zone";

export default function MainLayout({ parentThis }: { parentThis: any }) {

    return (
        <div className='min-h-screen flex flex-col flex-wrap' >
            <DialogManager />
            <Header />
            <SideMenu />
            <FlowZone />
            <RightSideDrawer />
            <Toaster />
        </div>
    )
}
