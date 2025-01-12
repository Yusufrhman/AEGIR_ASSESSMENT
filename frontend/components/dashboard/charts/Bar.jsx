import React from "react";
import { BarChart } from "@mui/x-charts/BarChart";

const data = [
  { name: "Piano", totalstudents: 24, totalTeachers: 5 },
  { name: "Violin", totalstudents: 29, totalTeachers: 4 },
  { name: "Cello", totalstudents: 21, totalTeachers: 5 },
  { name: "Guitar", totalstudents: 28, totalTeachers: 2 },
  { name: "Percussion", totalstudents: 35, totalTeachers: 2 },
  { name: "Viola", totalstudents: 38, totalTeachers: 4 },
  { name: "Clarinet", totalstudents: 29, totalTeachers: 6 },
  { name: "Harp", totalstudents: 33, totalTeachers: 2 },
  { name: "Trumpet", totalstudents: 38, totalTeachers: 4 },
  { name: "Drums", totalstudents: 19, totalTeachers: 3 },
];

const BarGraph = () => {
  const xAxisData = data.map((item) => item.name);
  const studentsData = data.map((item) => item.totalstudents);
  const teachersData = data.map((item) => item.totalTeachers);

  return (
    <div className="w-full aspect-[3/2] md:aspect-[5/2] lg:aspect-[7/2] h-full">
      <BarChart
        width={500}
        height={200}
        className="z-10 p-0 h-full  w-full"
        leftAxis={null}
        slotProps={{ legend: { hidden: true } }}
        xAxis={[{ scaleType: "band", data: xAxisData }]}
        series={[
          {
            data: studentsData,
            label: "Total Students",
            color: "#008080", // teal color for students
          },
          {
            data: teachersData,
            label: "Total Teachers",
            color: "#004d4d", // darker teal for teachers
          },
        ]}
      />
    </div>
  );
};

export default BarGraph;
