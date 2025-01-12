"use server";

import StatCard from "@/components/dashboard/StatCard";
import BarGraph from "@/components/dashboard/charts/Bar";

import {
  countInstrument,
  countPackages,
  countStudentAndTeacherByInstrument,
  countUsers,
  getAllUsers,
} from "@/lib/directus";
import {
  PiChalkboardTeacherDuotone,
  PiMusicNotesDuotone,
  PiPackageDuotone,
  PiStudentDuotone,
} from "react-icons/pi";

export default async function DashboardPage() {
  const countTeacher = await countUsers("Teacher");
  const countStudent = await countUsers("Student");
  const totalInstrument = await countInstrument();
  const totalPackages = await countPackages("draft");

  return (
    <section className="w-full px-8 py-10 text-gray-700 flex flex-col gap-12">
      <ul className="flex justify-center gap-10 mb-12">
        <li>
          <StatCard
            icon={<PiStudentDuotone size={40} className="text-teal-600" />}
            title="Total Students"
            value={`${countStudent} Students`}
          />
        </li>
        <li>
          <StatCard
            icon={
              <PiChalkboardTeacherDuotone size={40} className="text-teal-600" />
            }
            title="Total Teachers"
            value={`${countTeacher} Teachers`}
          />
        </li>
        <li>
          <StatCard
            icon={<PiMusicNotesDuotone size={40} className="text-teal-600" />}
            title="Total Instruments"
            value={`${totalInstrument} Instruments`}
          />
        </li>
        <li>
          <StatCard
            icon={<PiPackageDuotone size={40} className="text-teal-600" />}
            title="Total Draft Packages"
            value={`${totalPackages} Packages`}
          />
        </li>
      </ul>

      <div className="flex gap-12 justify-between">
        <div className="w-full flex items-center justify-center  p-0  bg-teal-50 rounded-lg shadow-md min-w-[25rem]">
          <BarGraph />
        </div>
      </div>
    </section>
  );
}
