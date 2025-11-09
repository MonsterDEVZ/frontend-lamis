import Image from 'next/image';

interface ITimelineCardProps {
  year: string;
  title: string;
  description: string[];
  image: string;
}

export const TimelineCard = ({ year, title, description, image }: ITimelineCardProps) => {
  return (

    <div className="flex-shrink-0 w-fit md:w-[400px]">
      <Image src={image} alt={title} width={400} height={250} className="rounded-xl" />
      
      <div className="flex items-center gap-1 my-4">
        <h3 className="text-2xl font-bold">{year}</h3>

        <div className="flex-grow border-b-2 border-dashed"></div>

        <div className="flex-shrink-0 w-5 h-5 rounded-full border border-green-500 flex items-center justify-center">
          <div className="w-2 h-2 rounded-full bg-green-500"></div>
        </div>
      </div>

        <p className="font-semibold">{title}</p>
        {description.map((line, i) => (
          <p key={i} className="text-gray-600 text-sm">
            {line}
          </p>
        ))}
    </div>
  );
};