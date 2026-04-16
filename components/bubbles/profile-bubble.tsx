"use client";

type ProfileBubbleProps = {
  name: string;
  title: string;
  location: string;
  imageUrl?: string;
};

export function ProfileBubble({
  name,
  title,
  location,
  imageUrl,
}: ProfileBubbleProps) {
  return (
    <div
      className="absolute left-1/2 top-1/2 z-20 h-[240px] w-[240px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-slate-300 bg-white shadow-lg"
    >
      <div className="flex h-full w-full flex-col items-center justify-center px-6 text-center">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={name}
            className="mb-4 h-20 w-20 rounded-full object-cover"
          />
        ) : (
          <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-slate-100 text-2xl font-semibold text-slate-700">
            {name.charAt(0)}
          </div>
        )}

        <p className="text-xl font-semibold text-slate-900">{name}</p>
        <p className="mt-1 text-sm text-slate-600">{title}</p>
        <p className="mt-2 text-sm text-slate-500">{location}</p>
      </div>
    </div>
  );
}