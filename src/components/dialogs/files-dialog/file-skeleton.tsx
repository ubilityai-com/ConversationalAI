export const FileSkeleton: React.FC = () => (
    <div className="flex items-center p-3 border border-gray-200 rounded-lg animate-pulse">
        <div className="w-5 h-5 bg-gray-300 rounded mr-3"></div>
        <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
                <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                <div className="w-4 h-4 bg-gray-300 rounded"></div>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-1.5 mt-2">
                <div className="h-1.5 bg-gray-300 rounded-full w-1/3"></div>
            </div>
        </div>
    </div>
);