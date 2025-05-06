import { CircleSmall, MessageCircle, Workflow } from 'lucide-react';
import { ReactNode, useState } from 'react';

// The MenuItemWit

const MenuItemWithSubMenu = ({ label, children }: { label: ReactNode, children: ReactNode }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <li className="relative px-5 py-3 cursor-pointer hover:bg-muted group text-sm rounded-xl">
            {label}
            <div className="absolute left-full top-0 min-w-52 max-h-96 p-1 shadow-lg bg-background rounded-r-md z-50 opacity-0 invisible transform -translate-x-2 group-hover:opacity-100 group-hover:visible group-hover:translate-x-2 transition-all duration-300 ease-in-out rounded-xl">
                <ul className="py-2 list-none m-0">
                    {children}
                </ul>
            </div>
        </li>
    );
};

// Regular menu item component
const MenuItem = ({ children }: { children: ReactNode }) => {
    return (
        <li className="px-5 py-3 cursor-pointer text-foreground hover:bg-muted transition-colors duration-200">
            {children}
        </li>
    );
};

// Submenu item component
const SubMenuItem = ({ children }: { children: ReactNode }) => {
    return (
        <li className="px-5 py-2 flex justify-start items-center gap-2 rounded-xl cursor-pointer hover:bg-muted transition-colors duration-200">
            {children}
        </li>
    );
};

// The main SideMenu component
const SideMenu = ({ parentThis }: { parentThis: any }) => {
    console.log({ parentThis });

    return (
        <div className="flex h-auto fixed left-6 top-1/4 z-50 w-auto bg-background text-foreground rounded-xl border drop-shadow-lg">
            <ul className="list-none p-1 m-0 w-full">

                <MenuItemWithSubMenu label={
                    <div className='flex flex-col justify-center items-center'>
                        <CircleSmall className='h-6 w-6' />
                        <span className=''>Basic</span>
                    </div>
                }>
                    {parentThis.state.components.map((component: {
                        "name": string,
                        "type": string,
                        "icon": string,
                        "color": string
                    }) => {
                        return (

                            <div
                                draggable="true"
                                key={component.name}
                                onDragStart={() => { parentThis.getDroppedElement(component); }}
                            >
                                {/* <DynamicIcon name="AArrowDown"  /> */}

                                <SubMenuItem><MessageCircle />{component.name}</SubMenuItem>
                            </div>
                        )
                    })}
                </MenuItemWithSubMenu>

                <MenuItemWithSubMenu label={
                    <div className='flex flex-col justify-center items-center'>
                        <Workflow className='h-6 w-6' />
                        <span className=''>Flows</span>
                    </div>
                }>
                    {parentThis.state.rpasList.map((rpa:any) => (
                        <div
                            draggable="true"
                            key={rpa.name}
                            onDragStart={() => { parentThis.getDroppedElement({ ...rpa, type: 'RPA' }); }}
                        >

                            <SubMenuItem><MessageCircle />{((rpa.name).length > 25)
                                ? (((rpa.name).substring(0, 25 - 3)) + '...')
                                : rpa.name
                            }</SubMenuItem>
                        </div>

                    ))
                    }
                    <SubMenuItem>All Customers</SubMenuItem>
                    <SubMenuItem>VIP Customers</SubMenuItem>
                    <SubMenuItem>Analytics</SubMenuItem>
                </MenuItemWithSubMenu>


            </ul>
        </div>
    );
};

export default SideMenu;