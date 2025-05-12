import Header from "./components/header";
import RightSideDrawer from "./components/right-side-drawer";
import SideMenu from "./components/side-bar";
import FlowZone from "./flow-zone";

export default function MainLayout({ parentThis }: { parentThis: any }) {

    return (
        <div className='min-h-screen flex flex-col flex-wrap' >
            <Header />
            <SideMenu />
            <FlowZone />
            <RightSideDrawer  />
        </div>
    )
}
