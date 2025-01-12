"use client";

import Loader from "@/components/Loader";
import Pagination from "@/components/Pagination";
import Table from "@/components/table/Table";
import SearchInput from "@/components/table/SearchInput";
import FilterSelect from "@/components/table/FilterSelect";
import { fetchData } from "@/lib/services/api";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { notFound, useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function PackagesPage() {
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
    queryKey: ["packages", currentPage, currentSearch, currentStatus],
    queryFn: () =>
      fetchData(
        "items/packages",
        {
          page: currentPage,
          fields: [
            "id",
            "name",
            "status",
            "instrument.name",
            "duration",
            "lessons_quota",
            "payments.rate",
            "student.first_name",
            "student.last_name",
          ],
          limit: limit,
          meta: "filter_count",
          ...(currentSearch && {
            "filter[student][first_name][_icontains]": currentSearch,
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
  const totalPages = Math.ceil(data.meta.filter_count / limit);
  if (currentPage > totalPages) {
    notFound();
  }

  const packagesData = data.data.map((packageData: any) => {
    return {
      ...packageData,
      student_name:
        packageData.student.first_name + " " + packageData.student.last_name,
      instrument: packageData.instrument.name,
      total_payments: `${packageData.payments.reduce(
        (sum: number, payment: any) => sum + payment.rate,
        0
      )} SGD`,
    };
  });

  const columns = [
    { field: "student_name", header: "Student" },
    { field: "name", header: "Package Name" },
    { field: "status", header: "Status" },
    { field: "instrument", header: "Instrument" },
    { field: "duration", header: "Duration" },
    { field: "lessons_quota", header: "Lessons Quota" },
    { field: "total_payments", header: "Total Payments" },
  ];

  return (
    <section className="min-h-[80svh] flex flex-col items-center justify-center">
      {/* Search and Filter Inputs */}
      <div className="w-full flex-col sm:flex-row flex items-start justify-between mb-4 gap-2 md:gap-4 my-5">
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
            { label: "Draft", value: "draft" },
            { label: "Published", value: "published" },
            { label: "Archived", value: "archived" },
          ]}
          defaultValue={currentStatus}
          onFilterChange={(value) => {
            router.push(
              `?page=1${currentSearch ? `&search=${currentSearch}` : ""}${
                value ? ` & status= ${value} ` : ""
              }`
            );
          }}
        />
      </div>

      {/* Table */}
      <Table currentPage={currentPage} data={packagesData} columns={columns} />

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
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
