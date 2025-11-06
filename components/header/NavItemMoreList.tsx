import type { FC } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

interface IProps {
  activeSubList: {
    img: string;
    href: string;
    title: string;
  }[];
}

const NavItemMoreList: FC<IProps> = ({ activeSubList }) => {
  return (
    <motion.div
      className="bg-white w-full border-t border-[#1d1d1d1a]"
      initial={{ opacity: 0 }}
      animate={{
        opacity: 100,
      }}
      transition={{ duration: 0.3 }}
    >
      <div className="mx-auto max-w-[1250px] w-full px-5 py-6">
        <div className="grid grid-cols-4 gap-x-8 gap-y-4">
          {activeSubList.map((item, index) => (
            <Link href={item.href} key={index} className="flex items-center gap-3 group">
              {item.img ? (
                <Image
                  src={item.img}
                  alt={item.title}
                  width={40}
                  height={40}
                  className="rounded-full object-cover"
                />
              ) : (
                <div className="w-10 h-10 bg-gray-100 rounded-full shrink-0"></div>
              )}
              <span className="font-medium text-sm text-gray-800 group-hover:text-[#009b3e] transition-colors duration-200">
                {item.title}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default NavItemMoreList;
