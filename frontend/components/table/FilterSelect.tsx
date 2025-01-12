"use client";

import { useRouter } from "next/navigation";

interface FilterSelectProps {
  filter: string
  options: { label: string; value: string }[];
  defaultValue?: string;
  onFilterChange?: (value: string) => void;
}

export default function FilterSelect({
  filter,
  options,
  defaultValue = "",
  onFilterChange,
}: FilterSelectProps) {
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    onFilterChange?.(value);
    router.push(`?${filter}=${value}`);
  };

  return (
    <select
      id={`${filter}-filter`}
      value={defaultValue}
      onChange={handleChange}
      className="border border-gray-300 rounded p-2 text-xs md:text-sm lg:text-base"
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}
