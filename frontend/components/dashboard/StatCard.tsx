import { FC, ReactNode } from "react";

interface StatCardProps {
  icon: ReactNode; // Ikon yang dapat dikustomisasi
  title: string; // Judul atau deskripsi
  value: string | number; // Nilai yang akan ditampilkan
  bgColor?: string; // Warna background utama
  iconBgColor?: string; // Warna background untuk ikon
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
      className="flex items-center justify-between px-6 py-4 rounded-lg shadow-sm gap-4"
      style={{ backgroundColor: bgColor }}
    >
      <div
        className="p-2 rounded-full"
        style={{ backgroundColor: iconBgColor }}
      >
        {icon}
      </div>
      <div>
        <p className="text-neutral-500 text-xs">{title}</p>
        <p className="text-lg">{value}</p>
      </div>
    </div>
  );
};

export default StatCard;
