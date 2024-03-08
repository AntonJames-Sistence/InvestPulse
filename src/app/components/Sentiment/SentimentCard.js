

const SentimentCard = ({ title, icon, description, color }) => {

    const colorClasses = {
        red: 'bg-red-100',
        green: 'bg-green-100',
        blue: 'bg-blue-100',
    };

    const colorForIcon = {
        red: 'bg-red-600',
        green: 'bg-green-600',
        blue: 'bg-blue-600',
    }

    const bgColorClass = colorClasses[color] || '';
    const bgColorIcon = colorForIcon[color] || '';

    return (
        <div className={`w-[50%] lg:w-[45%] first:mr-4 lg:mr-8 h-48 rounded-lg ${bgColorClass} flex p-4`}>
            <div className="mr-4">
                <div className={`h-10 w-10 ${bgColorIcon} rounded-full flex justify-center`}>
                    <div className="text-white text-2xl font-bold self-center">
                        {icon}
                    </div>
                </div>
            </div>
            <div className="flex flex-col">
                <p className="text-sm mb-2">{title}</p>
                <p className="text-xs text-gray-600 overflow-auto">{description}</p>
            </div>
        </div>
    )
}

export default SentimentCard;