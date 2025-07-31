import { Bot, CircleSmall, Link, MessageCircle, Workflow } from 'lucide-react';
import { ReactNode } from 'react';
import { AIElements } from '../elements/ai-elements';
import { useFlowStore } from '../store/flow-store';
import { ScrollArea } from './ui/scroll-area';
// import {  ScrollBar } from './ui/scroll-area';
// import * as ScrollArea from "@radix-ui/react-scroll-area"
// The MenuItemWit

const MenuItemWithSubMenu = ({ label, children }: { label: ReactNode, children: ReactNode }) => {
    return (
        <li className="relative px-5 py-3 cursor-pointer hover:bg-muted group text-sm rounded-xl">
            {label}
            <div className="absolute left-full top-0 min-w-52 max-h-96 overflow-hidden p-1 shadow-lg bg-background rounded-r-md z-50 opacity-0 invisible transform -translate-x-2 group-hover:opacity-100 group-hover:visible group-hover:translate-x-2 transition-all duration-300 ease-in-out rounded-xl">
                <ul className="py-2 list-none m-0">
                    {children}
                </ul>
            </div>
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
const SideMenu = () => {
    const { setDroppedElement, components, rpasList } = useFlowStore()

    return (
        <div className='flex flex-col gap-5 h-auto fixed left-6 top-1/4 z-50 w-auto '>
            <div className="flex bg-background text-foreground rounded-xl border drop-shadow-lg">
                <ul className="list-none p-1 m-0 w-full">
                    <MenuItemWithSubMenu label={
                        <div className='flex flex-col justify-center items-center'>
                            <Bot className='h-6 w-6' />
                            <span className=''>Agents</span>
                        </div>
                    }>
                        <ScrollArea className="h-64 rounded">
                            {AIElements.map((rpa: any) => (
                                <div
                                    draggable="true"
                                    key={rpa.label}
                                    onDragStart={() => { setDroppedElement(rpa); }}
                                >

                                    <SubMenuItem>
                                        <Link />
                                        {((rpa.label).length > 25)
                                            ? (((rpa.label).substring(0, 25 - 3)) + '...')
                                            : rpa.label
                                        }
                                    </SubMenuItem>
                                </div>

                            ))
                            }
                        </ScrollArea>
                    </MenuItemWithSubMenu>


                </ul>
            </div>
            <div className="flex bg-background text-foreground rounded-xl border drop-shadow-lg">
                <ul className="list-none p-1 m-0 w-full">

                    <MenuItemWithSubMenu label={
                        <div className='flex flex-col justify-center items-center'>
                            <CircleSmall className='h-6 w-6' />
                            <span className=''>Basic</span>
                        </div>
                    }>
                        {components.map((component: {
                            "name": string,
                            "type": string,
                            "icon": string,
                            "color": string
                        }) => {
                            return (

                                <div
                                    draggable="true"
                                    key={component.name}
                                    onDragStart={() => { setDroppedElement(component); }}
                                >
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
                        <ScrollArea className="h-64 rounded">
                            {rpasList.map((rpa: any) => (
                                <div
                                    draggable="true"
                                    key={rpa.name}
                                    onDragStart={() => { setDroppedElement({ ...rpa, type: 'RPA' }); }}
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
                        </ScrollArea>
                    </MenuItemWithSubMenu>


                </ul>
            </div>
        </div>
    );
};

export default SideMenu;
