import { GripVertical } from 'lucide-react';
import { useRef, useState } from 'react';
import { ListCardForm } from './right-side-elements/list-card-form/list-card-form';
import { Button } from './ui/button';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogOverlay, DialogPortal, DialogTitle, DialogTrigger } from './ui/dialog';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Node } from '@xyflow/react';

export default function RightSideDrawer({ open, parentThis }: { open: "open" | "closed", parentThis: any }) {
    const drawerRef = useRef<HTMLDivElement>(null);
   const [drawerWidth, setDrawerWidth] = useState(384) // Default width (max-w-sm = 24rem = 384px)
      const [isResizing, setIsResizing] = useState(false)
      const resizeStartXRef = useRef(0)
      const initialWidthRef = useRef(0)
    // Handle resize functionality
    const handleResizeStart = (e: React.MouseEvent) => {
        e.preventDefault()
        setIsResizing(true)
        resizeStartXRef.current = e.clientX
        initialWidthRef.current = drawerWidth
// 
        // Add event listeners for resize
        document.addEventListener("mousemove", handleResize)
        document.addEventListener("mouseup", handleResizeEnd)
// 
        // Change cursor during resize
        document.body.style.cursor = "ew-resize"
        document.body.style.userSelect = "none"
      }
      const handleResize = (e: MouseEvent) => {
        if (!isResizing) return
    
        const deltaX = resizeStartXRef.current - e.clientX
        const newWidth = Math.max(300, Math.min(800, initialWidthRef.current + deltaX))
        console.log({newWidth});
        
        setDrawerWidth(newWidth)
      }
    
      const handleResizeEnd = () => {
        setIsResizing(false)
        document.removeEventListener("mousemove", handleResize)
        document.removeEventListener("mouseup", handleResizeEnd)
    
        // Reset cursor
        document.body.style.cursor = ""
        document.body.style.userSelect = ""
      }
    // useEffect(() => {
    //     const drawer = drawerRef.current;
    //     if (!drawer) return;

    //     const observer = new MutationObserver(() => {
    //         const isOpen = drawer.getAttribute('data-open') === 'true';
    //         drawer.classList.toggle('translate-x-0', isOpen);
    //         drawer.classList.toggle('translate-x-full', !isOpen);
    //     });

    //     observer.observe(drawer, { attributes: true, attributeFilter: ['data-open'] });

    //     return () => observer.disconnect();
    // }, []);
    console.log({ parentThis });
    let ClickedElement
    if(parentThis.state.clickedElement)
     ClickedElement = parentThis.state.nodes.find((elt:Node) => elt.id === parentThis.state.clickedElement.id);
    else return<></>
    return (
        <div
            ref={drawerRef}
            data-open={open}
            className={`fixed top-[70px] right-0 h-full overflow-y-auto group w-[${drawerWidth}px] bg-background shadow-xl border-l border-gray-200 transform transition-transform duration-300 ease-in-out z-50 data-[open=closed]:translate-x-full data-[open=open]:translate-x-0`}
        >
              <div
                className="absolute left-0 inset-y-0 w-1 cursor-ew-resize hover:bg-[#72afdd] hover:opacity-50 flex items-center"
              onMouseDown={handleResizeStart}
            >
                <div className="absolute -left-3 top-1/2 -translate-y-1/2 bg-[#72afdd] rounded-full p-1 opacity-0 hover:opacity-100 transition-opacity">
                    <GripVertical className="h-4 w-4 text-white" />
                </div>
            </div>

            <div className="p-4">
                {parentThis.state.clickedElement &&
                    <ListCardForm
                        handleRightDrawerAddCounters={parentThis.handleRightDrawerAddCounters}
                        handleRightDrawerAddInnerCounters={parentThis.handleRightDrawerAddInnerCounters}
                        handleRightDrawerAnyFormChange={parentThis.handleRightDrawerAnyFormChange}
                        handleRightDrawerCheckIfAINLPIsChosenInBefore={parentThis.handleRightDrawerCheckIfAINLPIsChosenInBefore}
                        handleRightDrawerSubtractCounters={parentThis.handleRightDrawerSubtractCounters}
                        handleRightDrawerSubtractInnerCounters={parentThis.handleRightDrawerSubtractInnerCounters}
                        handleRightDrawerUploadIconClicked={parentThis.handleRightDrawerUploadIconClicked}
                        operations={parentThis.state.operations}
                        clickedElement={ClickedElement}
                        entities={parentThis.state.entities}
                        intents={parentThis.state.intents} />}
            </div>
        </div>
    );
}
function renderHandlerForm(props: any, ClickedElement: any) {
    // State for drawer width
    //   const [drawerWidth, setDrawerWidth] = useState(384) // Default width (max-w-sm = 24rem = 384px)
    //   const [isResizing, setIsResizing] = useState(false)
    //   const resizeStartXRef = useRef(0)
    //   const initialWidthRef = useRef(0)
    // // Handle resize functionality
    // const handleResizeStart = (e: React.MouseEvent) => {
    //     e.preventDefault()
    //     setIsResizing(true)
    //     resizeStartXRef.current = e.clientX
    //     initialWidthRef.current = drawerWidth

    //     // Add event listeners for resize
    //     document.addEventListener("mousemove", handleResize)
    //     document.addEventListener("mouseup", handleResizeEnd)

    //     // Change cursor during resize
    //     document.body.style.cursor = "ew-resize"
    //     document.body.style.userSelect = "none"
    //   }
    return (
        <div className=''>
          
        </div>
    )
}

const DialogDemo = () => (
    <Dialog>
        <DialogTrigger asChild>
            <button className="Button violet">Edit profile</button>
        </DialogTrigger>
        <DialogPortal>
            <DialogOverlay className="DialogOverlay" />
            <DialogContent className="DialogContent dark">
                <DialogTitle className="DialogTitle">Edit profile</DialogTitle>
                <DialogDescription className="DialogDescription">
                    Make changes to your profile here. Click save when you're done.
                </DialogDescription>
                <Label
                    htmlFor="name"
                >
                    Name
                </Label>
                <Input
                    id="name"
                    defaultValue="Pedro Duarte"
                />
                <div
                    style={{ display: "flex", marginTop: 25, justifyContent: "flex-end" }}
                >
                    <DialogClose asChild>
                        <Button className="Button green">Save changes</Button>
                    </DialogClose>
                </div>
            </DialogContent>
        </DialogPortal>
    </Dialog>
);
