"use client";
import Loader from "@/components/Loader";
import Pagination from "@/components/Pagination";
import Table from "@/components/table/Table";
import { fetchData } from "@/lib/services/api";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function InstrumentsPage({}) {
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

  const { data, isLoading, isError, error,  } = useQuery({
    queryKey: ["instruments", currentPage],
    queryFn: () =>
      fetchData(
        "items/instruments",
        {
          page: currentPage,
          fields: ["id","name", "count(students)", "count(teachers)"],
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

  const columns = [
    { field: "name", header: "Instrument Name" },
    { field: "teachers_count", header: "Total Teachers" },
    { field: "students_count", header: "Total Students" },
  ];


  return (
    <section className="min-h-[80svh] flex flex-col gap-0 items-center justify-center">
      <Table data={data.data} columns={columns} />
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
