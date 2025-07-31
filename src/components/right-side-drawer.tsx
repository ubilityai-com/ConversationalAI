import { GripVertical } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useFlowStore } from '../store/flow-store';
import { PropertiesPanel } from './properties-panel';
import { useVariablesPanel, VariablesPanel } from './variable-picker';

let isFirstTime = true;

export default function RightSideDrawer() {
    const drawerRef = useRef<HTMLDivElement>(null);
    const [newWidthRightDrawer, setNewWidthRightDrawer] = useState(400);
    const clickedElement = useFlowStore(state => state.clickedElement);
    const variablesPickerVisible = useFlowStore(state => state.variablesPickerVisible);
    const setVarPicker = useFlowStore(state => state.setVarPicker);

    useEffect(() => {
        const handleWindowResize = () => {
            const rightSideWidth = document.body.offsetWidth * 0.3;
            setNewWidthRightDrawer(rightSideWidth < 400 ? 400 : rightSideWidth);
        };
        if (isFirstTime) handleWindowResize();
        window.addEventListener('resize', handleWindowResize);
        isFirstTime = false;
        return () => {
            window.removeEventListener('resize', handleWindowResize);
        };
    }, []);

    const handleMouseDown = (e: React.MouseEvent) => {
        e.preventDefault();

        const startX = e.clientX;

        const handleMouseMove = (e: MouseEvent) => {
            const newWidth = document.body.offsetWidth - e.clientX;
            if (newWidth >= 400 && newWidth <= 900) {
                setNewWidthRightDrawer(newWidth);
            }
        };

        const handleMouseUp = () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };

        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
    };

    const variablesPanel = useVariablesPanel();

    return (
        <>
            <VariablesPanel
                isOpen={variablesPickerVisible}
                isMinimized={variablesPanel.isMinimized}
                onClose={() => setVarPicker(false)}
                onToggleMinimize={variablesPanel.toggleMinimize}
                right={newWidthRightDrawer}
            />

            <div
                ref={drawerRef}
                data-open={!!clickedElement ? "open" : "closed"}
                style={{ width: `${newWidthRightDrawer}px` }}
                className={`fixed top-[56px] right-0 h-[calc(100%-61px)] min-h-[calc(100%-61px)] overflow-y-auto overflow-x-hidden group bg-background shadow-2xl border-l border-border transition-transform duration-300 ease-in-out z-40 data-[open=closed]:translate-x-full data-[open=open]:translate-x-0`}
            >
                <div
                    className="absolute left-0 inset-y-0 w-1 cursor-ew-resize hover:bg-[#72afdd] hover:opacity-50 flex items-center"
                    id="dragger"
                    onMouseDown={handleMouseDown}
                >
                    <div className="absolute -left-3 top-1/2 -translate-y-1/2 bg-[#72afdd] rounded-full p-1 hover:opacity-100 transition-opacity">
                        <GripVertical className="h-4 w-4 text-white" />
                    </div>
                </div>
                <div
                    className=" flex-1 h-full overflow-y-scroll">
                    <PropertiesPanel />
                </div>
            </div>
        </>
    );
}
