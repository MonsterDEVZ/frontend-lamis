import { Mouse } from 'lucide-react';

interface IIntroCardProps {
  title: string;
  description: string;
}

export const IntroCard = ({ title, description }: IIntroCardProps) => {
  return (
    <div className="flex-shrink-0 w-full flex flex-col justify-center max-w-md mx-auto md:justify-start">
      <h2 className="text-2xl lg:text-4xl font-bold">{title}</h2>
      <p className="mt-4 text-gray-600 md:mb-30">{description}</p>
      <div className="flex items-center mt-5 md:mt-10 lg:mt-8 xl:mt-7.5 text-[#1d1d1d] gap-4 justify-center">
        <svg
          width="22"
          height="34"
          viewBox="0 0 22 34"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M20.77 22.3014V10.8866C20.77 5.42694 16.3431 1 10.8866 1C5.42694 1 1 5.42694 1 10.8866V22.3014C1 27.7611 5.42694 32.1881 10.8866 32.1881C16.3431 32.1881 20.77 27.7611 20.77 22.3014Z"
            stroke="#272B2B"
            strokeWidth="2"
            strokeMiterlimit="10"
          />
          <path
            d="M12.3378 14.8246V10.6132C12.3378 9.81853 11.6911 9.17188 10.8836 9.17188C10.0889 9.17188 9.43262 9.81853 9.43262 10.6132V14.8246C9.43262 15.6289 10.0889 16.2756 10.8836 16.2756C11.6911 16.2756 12.3378 15.6289 12.3378 14.8246Z"
            fill="#272B2B"
          />
          <path
            d="M8.39355 6.88723L10.8901 4.39062L13.3771 6.88723"
            stroke="#272B2B"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M13.38 18.4922L10.8834 20.9888L8.39648 18.4922"
            stroke="#272B2B"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>

        <div className="flex items-center md:flex-grow md:mr-5">
          <p className='md:mr-4'>Начните вращать <br /> колесико</p>
          <div className="md:flex-grow md:border-b-2 md:border-dashed"></div>
          <div className="md:flex-shrink-0 md:w-5 md:h-5 md:rounded-full md:border md:border-green-500 md:flex md:items-center md:justify-center">
            <div className="md:w-2 md:h-2 md:rounded-full md:bg-green-500"></div>
          </div>
        </div>
      </div>
    </div>
  );
};
