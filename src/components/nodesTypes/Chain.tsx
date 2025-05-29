import { Link, Plus, Sparkles } from 'lucide-react';
import { MouseEvent, useState } from 'react';
import { useFlowStore } from '../../store/flow-store';

const Chain = ({
    data = {
        label: 'Chain Step',
        leftConnector: 'Model',
        rightConnector: 'Vector Store',
        nodeType:"model"
    },
}) => {
    const [hoveredSide, setHoveredSide] = useState(null);
    const setDialogProps = useFlowStore(state => state.setDialogProps)
    const setIsFormDialogOpen = useFlowStore(state => state.setIsFormDialogOpen)
    const setFormDialogStatus = useFlowStore(state => state.setFormDialogStatus)
    const onAdd = (event:MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()
        setFormDialogStatus("langchain")
        console.log({sss:require(`../../elements/model-elements`).default});
        
        setDialogProps({
            searchable: true,
            title: "Available Applications",
            description: "Choose from our collection of powerful applications",
            items: require(`../../elements/model-elements`).default
        })
        setIsFormDialogOpen(true)
    }
    const PlusConnector = ({ side, label, className }: { side: string, label: string, className: string }) => (
        <div className="absolute">
            {/* Floating edge line */}
            <div className={`absolute top-2  transform -translate-y-1/2 w-0.5 bg-emerald-400 h-5
                      ${side === "left" ? 'left-5' : `right-5`}`} />

            {/* Floating plus button at the end of the line */}
            <button
                className={`absolute w-8 top-8 h-8 bg-gradient-to-br from-emerald-400 to-emerald-500 
                    rounded-full border-3 border-white shadow-2xl
                    flex items-center justify-center transition-all duration-300
                    hover:scale-110 hover:shadow-emerald-500/50
                    hover:from-emerald-300 hover:to-emerald-400
                    z-10 ${className}`}
                // onMouseEnter={() => setHoveredSide(side)}
                // onMouseLeave={() => setHoveredSide(null)}
                onClick={onAdd}
                style={{ filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.15))' }}
            >
                <Plus className="w-4 h-4 text-white drop-shadow-sm" />
            </button>
            <div className='absolute text-xs top-12'>Vector store</div>
        </div>
    );

    return (
        <div className="relative">
            {/* Main Node */}
            <div className="bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 
                      rounded-2xl shadow-xl p-[2px] relative">

                {/* Inner content */}
                <div className="bg-white rounded-2xl px-4 py-3 flex items-center gap-3 relative overflow-hidden">

                    {/* Background decoration */}
                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 to-purple-50 opacity-60" />

                    {/* Chain Icon */}
                    <div className="relative z-10 p-2 bg-gradient-to-br from-indigo-500 to-purple-600 
                          rounded-xl shadow-md">
                        <Link className="w-4 h-4 text-white" />
                    </div>

                    {/* Node Label */}
                    <div className="relative z-10">
                        <div className="text-gray-800 font-semibold text-sm">{data.label}</div>
                        <div className="flex items-center gap-1 mt-0.5">
                            <Sparkles className="w-3 h-3 text-purple-500" />
                            <span className="text-purple-600 text-xs font-medium">Chain Link</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Left Plus with floating edge */}
            <div className="bottom-0 transform -translate-y-1/2 absolute">
                <PlusConnector
                    side="left"
                    label={data.leftConnector}
                    className="top-1/2 transform -translate-y-1/2 left-1"
                />
            </div>

            {/* Right Plus with floating edge */}
            <div className="bottom-0 right-0 transform -translate-y-1/2 absolute">
                <PlusConnector
                    side="right"
                    label={data.rightConnector}
                    className="transform -translate-y-1/2 right-1"
                />
            </div>

        </div>
    );
};

export default Chain;