"use client";

import Loader from "@/components/Loader";
import Pagination from "@/components/Pagination";
import Table from "@/components/table/Table";
import SearchInput from "@/components/table/SearchInput";
import FilterSelect from "@/components/table/FilterSelect";
import { fetchData } from "@/lib/services/api";
import { formattedDate } from "@/lib/utils/date-formatter";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function LessonsPage() {
  const params = useSearchParams();
  const router = useRouter();
  const session = useSession();

  const currentSearch = params.get("search") || "";
  const currentStatus = params.get("status") || "";
  const currentPage = parseInt(params.get("page") || "1");
  const limit = 10;

  useEffect(() => {
    if (currentPage < 1) {
      router.push("?page=1");
    }
  }, [currentPage]);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["lessons", currentPage, currentSearch, currentStatus],
    queryFn: () =>
      fetchData(
        "items/lessons",
        {
          page: currentPage,
          fields: [
            "id",
            "package.name",
            "teacher.first_name",
            "teacher.last_name",
            "package.student.first_name",
            "package.student.last_name",
            "status",
            "start_datetime",
          ],
          limit: limit,
          meta: "filter_count",
          ...(currentSearch && {
            "filter[teacher][first_name][_icontains]": currentSearch,
          }),
          ...(currentStatus && { "filter[status]": currentStatus }),
        },
        session?.data?.access_token as string
      ),
  });

  if (isLoading) {
    return (
      <section className="min-h-[80svh] flex items-center justify-center">
        <Loader />
      </section>
    );
  }

  if (isError) {
    return (
      <section className="min-h-[80svh] flex items-center justify-center">
        <div>Error loading data.</div>
      </section>
    );
  }

  const lessonsData = data.data.map((lesson: any) => {
    return {
      ...lesson,
      package: lesson.package.name,
      teacher_name: lesson.teacher.first_name + " " + lesson.teacher.last_name,
      student_name:
        lesson.package.student.first_name + " " + lesson.package.student.last_name,
      date: formattedDate(lesson.start_datetime),
    };
  });

  const columns = [
    { field: "teacher_name", header: "Teacher" },
    { field: "student_name", header: "Student" },
    { field: "package", header: "Package" },
    { field: "date", header: "Start Date" },
    { field: "status", header: "Status" },
  ];

  return (
    <section className="min-h-[80svh] flex flex-col items-center justify-center">
      {/* Search and Filter Inputs */}
      <div className="w-full flex  flex-col sm:flex-row items-start justify-between mb-4 gap-2 md:gap-4 my-5">
        <SearchInput
          defaultValue={currentSearch}
          onSearch={(value) => {
            router.push(
              `?page=1${value ? `&search=${value}` : ""}${
                currentStatus ? `&status=${currentStatus}` : ""
              }`
            );
          }}
        />
        <FilterSelect
          filter="status"
          options={[
            { label: "All", value: "" },
            { label: "Attended", value: "attended" },
            { label: "Absent", value: "absent" },
          ]}
          defaultValue={currentStatus}
          onFilterChange={(value) => {
            router.push(
              `?page=1${currentSearch ? `&search=${currentSearch}` : ""}${
                value ? `&status=${value}` : ""
              }`
            );
          }}
        />
      </div>

      {/* Table */}
      <Table data={lessonsData} columns={columns} />

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={Math.ceil(data.meta.filter_count / limit)}
        onPageChange={(page) => {
          router.push(
            `?page=${page}${currentSearch ? `&search=${currentSearch}` : ""}${
              currentStatus ? `&status=${currentStatus}` : ""
            }`
          );
        }}
      />
    </section>
  );
}
