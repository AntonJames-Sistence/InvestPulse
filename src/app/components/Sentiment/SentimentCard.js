

const SentimentCard = ({ title, icon, description, color }) => {

    return (
        <div className={`w-[55%] mr-8 h-48 rounded-lg bg-${color}-100 grid grid-cols-2 p-4`}>
            <div className={`h-10 w-10 bg-${color}-600 rounded-full flex justify-center`}>
                <div className="text-white text-2xl font-bold self-center">
                    {icon}
                </div>
            </div>
            <div className="flex flex-col">
                <p className="text-sm">{title}</p>
                <p className="text-xs text-gray-600">{description}</p>
            </div>
        </div>
    )
}

export default SentimentCard;