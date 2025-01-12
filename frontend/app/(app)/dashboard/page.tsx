"use server";

import StatCard from "@/components/dashboard/StatCard";
import BarGraph from "@/components/dashboard/charts/Bar";

import {
  countInstrument,
  countLessons,
  countPackages,
  countUsers,
  sumPayment,
} from "@/lib/directus";
import {
  PiChalkboardTeacherDuotone,
  PiMoneyWavyDuotone,
  PiMusicNotesDuotone,
  PiPackageDuotone,
  PiStudentDuotone,
} from "react-icons/pi";

import { MdOutlinePlayLesson } from "react-icons/md";
import Link from "next/link";

export default async function DashboardPage() {
  const countTeacher = await countUsers("Teacher");
  const countStudent = await countUsers("Student");
  const totalInstrument = await countInstrument();
  const totalPackages = await countPackages("draft");
  const totalLessons = await countLessons();
  const totalPayment = await sumPayment();

  return (
    <section className="w-full py-10 text-gray-700 flex flex-col gap-12">
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-10 mb-12">
        <li>
          <Link href="/dashboard/users?role=Student">
            <StatCard
              icon={<PiStudentDuotone size={40} className="text-teal-600" />}
              title="Total Students"
              value={`${countStudent}`}
            />
          </Link>
        </li>
        <li>
          <Link href="/dashboard/users?role=Teacher">
            <StatCard
              icon={
                <PiChalkboardTeacherDuotone
                  size={40}
                  className="text-teal-600"
                />
              }
              title="Total Teachers"
              value={`${countTeacher}`}
            />
          </Link>
        </li>
        <li>
          <Link href="/dashboard/instruments">
            <StatCard
              icon={<PiMusicNotesDuotone size={40} className="text-teal-600" />}
              title="Total Instruments"
              value={`${totalInstrument}`}
            />
          </Link>
        </li>
        <li>
          <Link href="/dashboard/packages">
            <StatCard
              icon={<PiPackageDuotone size={40} className="text-teal-600" />}
              title="Total Draft Packages"
              value={`${totalPackages}`}
            />
          </Link>
        </li>
        <li>
          <Link href="/dashboard/lessons">
            <StatCard
              icon={<MdOutlinePlayLesson size={40} className="text-teal-600" />}
              title="Total Lessons"
              value={`${totalLessons}`}
            />
          </Link>
        </li>
        <li>
          <Link href="/dashboard/payments">
            <StatCard
              icon={<PiMoneyWavyDuotone size={40} className="text-teal-600" />}
              title="Total Payment"
              value={
                <span className="text-xl">
                  {(totalPayment / 1000).toFixed(0)}K SGD
                </span>
              }
            />
          </Link>
        </li>
      </ul>
      <div className="flex flex-col gap-4 justify-between overflow-x-clip">
        {" "}
        <h2 className="font-semibold text-base md:text-lg lg:text-xl text-center w-full">
          Students and Teachers by Instrument
        </h2>
        <div className="flex flex-col items-center justify-center  p-0  bg-teal-50 rounded-lg shadow-md  overflow-x-scroll">
          <BarGraph />
        </div>
      </div>
    </section>
  );
}
