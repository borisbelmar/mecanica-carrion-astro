interface ServiceItemProps {
  title: string
  description: string
  imageUrl: string
}

export default function ServiceItem({
  title,
  description,
  imageUrl
}: ServiceItemProps) {
  return (
    <div className="bg-gray-800 rounded-lg flex flex-col items-center shadow-lg">
      <img
        src={imageUrl}
        alt={title}
        className="w-full object-cover aspect-video rounded-t-lg"
      />
      <div className="py-5 px-4 flex flex-col">
        <h3 className="font-semibold text-white mb-2">
          {title}
        </h3>
        <hr className="border-yellow-500 mb-2 border w-1/3" />
        <p className="text-gray-300 text-sm">
          {description}
        </p>
      </div>
    </div>
  )
}