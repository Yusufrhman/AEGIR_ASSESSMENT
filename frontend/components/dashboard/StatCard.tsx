import { FC, ReactNode } from "react";

interface StatCardProps {
  icon: ReactNode; 
  title: string; 
  value: string | number | React.ReactNode; 
  bgColor?: string; 
  iconBgColor?: string;
}

const StatCard: FC<StatCardProps> = ({
  icon,
  title,
  value,
  bgColor = "#eefffd",
  iconBgColor = "#d0fffa",
}) => {
  return (
    <div
      className="flex flex-col items-center justify-between text-center px-6 py-4 rounded-lg shadow-sm gap-4 min-w-[10rem] hover:cursor-pointer hover:scale-110 transition-all"
      style={{ backgroundColor: bgColor }}
    >
      <div
        className="p-2 rounded-full"
        style={{ backgroundColor: iconBgColor }}
      >
        {icon}
      </div>
      <div>
        <p className="text-2xl font-semibold tracking-wider">{value}</p>
        <p className="text-neutral-500 text-xs">{title}</p>
      </div>
    </div>
  );
};

export default StatCard;
