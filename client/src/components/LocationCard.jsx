import { Link } from "lucide-react";
import { truncateText } from "../utils/truncateText";

function LocationCard({ location, selectedTags, onTagClick }) {
  const copyToClipboard = (text) => {
    var textField = document.createElement("textarea");
    textField.innerText = text;
    document.body.appendChild(textField);
    textField.select();
    document.execCommand("copy");
    textField.remove();
  };
  return (
    <div className="flex gap-8">
      <img
        src={location.photos[0]}
        alt="Photo 1"
        className="w-full max-w-[360px] max-h-56 rounded-2xl object-cover"
      />
      <div className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl text-gray-800 font-medium">
            {location.title}
          </h2>
          <p className="text-md text-gray-500">
            {truncateText(location.description, 100)}
          </p>
          <a
            href={location.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 underline"
          >
            อ่านต่อ
          </a>
          <div className="flex gap-3 text-md text-gray-500">
            หมวด
            {location.tags.map((tag, index) => {
              const isLast = index === location.tags.length - 1;
              const isSelected = selectedTags.includes(tag);
              return (
                <span key={index} className="flex gap-3">
                  {isLast && "และ"}
                  <button
                    className={`underline ${
                      isSelected ? "text-blue-500 font-bold" : ""
                    }`}
                    onClick={() => onTagClick(tag)}
                  >
                    {tag}
                  </button>
                </span>
              );
            })}
          </div>
        </div>
        <div className="w-full flex flex-row justify-between">
          <div className="flex gap-5">
            {location.photos
              .filter((_, index) => index !== 0)
              .map((photo, index) => (
                <img
                  key={index}
                  src={photo}
                  alt={`Photo ${index}`}
                  className="w-25 h-25 rounded-xl"
                />
              ))}
          </div>
          <div className="flex items-end">
            <Link  className="cursor-pointer text-gray-500 hover:text-blue-500" onClick={() => copyToClipboard(location.url)} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default LocationCard;
