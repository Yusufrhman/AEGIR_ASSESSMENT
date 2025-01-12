"use client";
import Loader from "@/components/Loader";
import Pagination from "@/components/Pagination";
import Table from "@/components/table/Table";
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
  let currentPage = parseInt(params.get("page") || "1");
  const limit = 10;

  useEffect(() => {
    if (currentPage < 1) {
      router.push("?page=1");
    }
  }, [currentPage]);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["lessons", currentPage],
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
          meta: "total_count",
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
  console.log(data.data);
  let lessonsData = data.data.map((lesson: any) => {
    return {
      ...lesson,
      package: lesson.package.name,
      teacher_name: lesson.teacher.first_name + " " + lesson.teacher.last_name,
      student_name:
        lesson.package.student.first_name +
        " " +
        lesson.package.student.last_name,
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
    <section className="min-h-[80svh] flex flex-col gap-0 items-center justify-center">
      <Table data={lessonsData} columns={columns} />
      <Pagination
        currentPage={currentPage}
        totalPages={Math.floor(data.meta.total_count / limit)}
        onPageChange={(page) => {
          router.push(`?page=${page}`);
        }}
      />
    </section>
  );
}
