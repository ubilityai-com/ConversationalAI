import { GripVertical } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import RightSideBody from './right-side-body';

let isFirstTime = true;
export default function RightSideDrawer({ open, parentThis }: { open: "open" | "closed", parentThis: any }) {
    const drawerRef = useRef<HTMLDivElement>(null);
    const [newWidthRightDrawer, setNewWidthRightDrawer] = useState(100)
    useEffect(() => {
        const handleWindowResize = () => {
            const rightSideWidth = document.body.offsetWidth * 0.3
            setNewWidthRightDrawer(rightSideWidth < 345 ? 345 : rightSideWidth);
        };
        if (isFirstTime) handleWindowResize()
        window.addEventListener('resize', handleWindowResize);
        isFirstTime = false
        return () => {
            window.removeEventListener('resize', handleWindowResize);
        };
    }, [document.body.offsetWidth]);
    const handleResizeDrawer = (event: React.DragEvent<HTMLDivElement>) => {
        let offsetRight = document.body.offsetWidth - (event.clientX - document.body.offsetLeft);
        if (offsetRight > 345 && offsetRight < 900) {//minWidth = 345 maxWidth = 700;
            setNewWidthRightDrawer(offsetRight + 10);
        }
    }


    return (
        <div
            ref={drawerRef}
            data-open={open}
            style={{ width: `${newWidthRightDrawer}px` }}
            className={`fixed top-[70px] right-0 h-[calc(100%-70px)] min-h-[calc(100%-70px)] overflow-y-auto overflow-x-hidden group w-[${newWidthRightDrawer}px] bg-background shadow-2xl border-l border-border transform transition-transform duration-300 ease-in-out z-40 data-[open=closed]:translate-x-full data-[open=open]:translate-x-0`}
        >
            <div
                className="absolute left-0 inset-y-0 w-1 cursor-ew-resize hover:bg-[#72afdd] hover:opacity-50 flex items-center"
                id="dragger"
                draggable={true}
                onDrag={handleResizeDrawer}
            >
                <div className="absolute -left-3 top-1/2 -translate-y-1/2 bg-[#72afdd] rounded-full p-1 opacity-0 hover:opacity-100 transition-opacity">
                    <GripVertical className="h-4 w-4 text-white" />
                </div>
            </div>
            <RightSideBody parentThis={parentThis} />
        </div>
    );
}

