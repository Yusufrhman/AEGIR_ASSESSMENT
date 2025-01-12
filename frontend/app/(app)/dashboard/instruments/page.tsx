"use client";

import Loader from "@/components/Loader";
import Pagination from "@/components/Pagination";
import Table from "@/components/table/Table";
import SearchInput from "@/components/table/SearchInput";
import { fetchData } from "@/lib/services/api";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function InstrumentsPage({}) {
  const params = useSearchParams();
  const router = useRouter();
  const session = useSession();

  const currentSearch = params.get("search") || "";
  let currentPage = parseInt(params.get("page") || "1");
  const limit = 10;

  useEffect(() => {
    if (currentPage < 1) {
      router.push("?page=1");
    }
  }, [currentPage]);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["instruments", currentPage, currentSearch],
    queryFn: () =>
      fetchData(
        "items/instruments",
        {
          page: currentPage,
          fields: ["id", "name", "count(students)", "count(teachers)"],
          limit: limit,
          meta: "filter_count",
          ...(currentSearch && {
            "filter[name][_icontains]": currentSearch,
          }),
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

  const columns = [
    { field: "name", header: "Instrument Name" },
    { field: "teachers_count", header: "Total Teachers" },
    { field: "students_count", header: "Total Students" },
  ];

  return (
    <section className="min-h-[80svh] flex flex-col gap-4 items-center justify-center">
      {/* Search Input */}
      <div className="w-full flex items-center justify-start mb-4">
        <SearchInput
          defaultValue={currentSearch}
          onSearch={(value) => {
            router.push(`?page=1${value ? `&search=${value}` : ""}`);
          }}
        />
      </div>

      {/* Table */}
      <Table data={data.data} columns={columns} />

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={Math.ceil(data.meta.filter_count / limit)}
        onPageChange={(page) => {
          router.push(
            `?page=${page}${currentSearch ? `&search=${currentSearch}` : ""}`
          );
        }}
      />
    </section>
  );
}
