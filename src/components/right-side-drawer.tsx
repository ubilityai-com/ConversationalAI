import { useRef } from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion';
import { Alert } from './ui/alert';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogOverlay, DialogPortal, DialogTitle, DialogTrigger } from './ui/dialog';
import { Cross } from 'lucide-react';

export default function RightSideDrawer({ open, parentThis }: { open: "open" | "closed", parentThis: any }) {
    const drawerRef = useRef<HTMLDivElement>(null);

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

    return (
        <div
            ref={drawerRef}
            data-open={open}
            className="fixed top-[70px] right-0 h-full group w-80 bg-background shadow-xl border-l border-gray-200 transform transition-transform duration-300 ease-in-out z-50 data-[open=closed]:translate-x-full data-[open=open]:translate-x-0"
        >
            <div className="p-4">
                {parentThis.state.clickedElement && renderHandlerForm(parentThis, parentThis.state.clickedElement)}
            </div>
        </div>
    );
}
function renderHandlerForm(props: any, ClickedElement: any) {
    console.log({ ClickedElement });

    return (
        <div className=''>
            <DialogDemo/>
            <div className="space-y-2">

                <Label > {'Greet'}</Label>
                <Input
                    name={'greet'}
                    //label={'Greet'}
                    placeholder={'Welcome message'}

                    //InputLabelProps={{ style: { fontSize: '13px', fontWeight: 'bold', margin: '2px 0px 0px -2px' } }} // font size of input label
                    value={ClickedElement.data.greet || ''}
                    onChange={(event) => props.handleRightDrawerAnyFormChange(event, -1, -1, -1, false)}
                />
            </div>
            <div className="space-y-2">
                <Label > {'Restart'}</Label>
                <Input
                    name={'restart'}
                    placeholder={'Message displayed when bot restarts'}

                    value={ClickedElement.data.restart || ''}
                    onChange={(event) => props.handleRightDrawerAnyFormChange(event, -1, -1, -1, false)}
                />
            </div>
            <Label > {'Thank You'}</Label>
            <Input
                name={'thankYou'}
                placeholder={'Message displayed when user thanks the bot'}

                value={ClickedElement.data.thankYou || ''}
                onChange={(event) => props.handleRightDrawerAnyFormChange(event, -1, -1, -1, false)}
            />
            <Label > {'Cancel'}</Label>
            <Input
                name={'cancel'}
                placeholder={'Message displayed when user cancels conversation'}

                value={ClickedElement.data.cancel || ''}
                onChange={(event) => props.handleRightDrawerAnyFormChange(event, -1, -1, -1, false)}
            />
            <Label > {'Bye'}</Label>
            <Input
                name={'bye'}
                placeholder={'Message displayed when user says bye'}

                value={ClickedElement.data.bye || ''}
                onChange={(event) => props.handleRightDrawerAnyFormChange(event, -1, -1, -1, false)}
            />
            {/* <Accordion>
            <AccordionItem className="AccordionItem" value="item-1">
                <AccordionTrigger>Is it accessible?</AccordionTrigger>
                <AccordionContent>
                    Yes. It adheres to the WAI-ARIA design pattern.
                </AccordionContent>
            </AccordionItem>
            </Accordion> */}

            <Alert className='my-3'> {'Enable the bot to handle user messages before starting the conversation.'}</Alert>

            < Button

                onClick={(event) => props.handleRightDrawerAddCounters(event, true)}
            >
                {ClickedElement.data.dynamicDataHandler.length !== 0 ? 'ADD' : 'ENABLE'}
            </Button>
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
