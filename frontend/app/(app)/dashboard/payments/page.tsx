"use client";

import Loader from "@/components/Loader";
import Pagination from "@/components/Pagination";
import FilterSelect from "@/components/table/FilterSelect";
import SearchInput from "@/components/table/SearchInput";
import Table from "@/components/table/Table";
import { fetchData } from "@/lib/services/api";
import { formattedDate } from "@/lib/utils/date-formatter";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function PaymentsPage() {
  const params = useSearchParams();
  const router = useRouter();
  const session = useSession();

  const currentSearch = params.get("search") || "";
  const currentSort = params.get("sort") || "-payment_date";
  const [currentPage, setCurrentPage] = useState(
    parseInt(params.get("page") || "1")
  );
  const limit = 10;

  useEffect(() => {
    if (currentPage < 1) {
      setCurrentPage(1);
      router.push(`?page=1`);
    }
  }, [currentPage]);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["payments", currentPage, currentSort, currentSearch],
    queryFn: () =>
      fetchData(
        "items/payments",
        {
          sort: currentSort,
          page: currentPage,
          fields: [
            "id",
            "package.student.first_name",
            "package.student.last_name",
            "payment_date",
            "package.name",
            "rate",
            "currency",
          ],
          limit: limit,
          meta: "filter_count",
          ...(currentSearch && {
            "filter[package][student][first_name][_icontains]": currentSearch,
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

  const paymentsData = data.data.map((payment: any) => {
    return {
      ...payment,
      student_name:
        payment.package.student.first_name +
        " " +
        payment.package.student.last_name,
      package: payment.package.name,
      date: formattedDate(payment.payment_date),
      amount: payment.rate + " " + payment.currency,
    };
  });

  const columns = [
    { field: "student_name", header: "Student" },
    { field: "date", header: "Date" },
    { field: "package", header: "Package" },
    { field: "amount", header: "Amount" },
  ];

  return (
    <section className="min-h-[80svh] flex flex-col items-start justify-center">
      {/* Search and Sort */}
      <div className="flex flex-col sm:flex-row items-start justify-start gap-2 md:gap-4 my-5">
        <SearchInput
          defaultValue={currentSearch}
          onSearch={(value) => {
            router.push(
              `?page=1&sort=${currentSort}${value ? `&search=${value}` : ""}`
            );
          }}
        />

        <FilterSelect
          filter="sort"
          options={[
            { label: "Sort by date (desc)", value: "-payment_date" },
            { label: "Sort by date (asc)", value: "payment_date" },
            { label: "Sort by amount (desc)", value: "-rate" },
            { label: "Sort by amount (asc)", value: "rate" },
          ]}
          defaultValue={currentSort}
          onFilterChange={(value) => {
            router.push(
              `?page=1&sort=${value}${
                currentSearch ? `&search=${currentSearch}` : ""
              }`
            );
          }}
        />
      </div>

      {/* Table */}
      <Table data={paymentsData} columns={columns} />

      {/* Pagination */}
      <div className="w-full mx-auto">
        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(data.meta.filter_count / limit)}
          onPageChange={(page) => {
            setCurrentPage(page);
            router.push(
              `?page=${page}&sort=${currentSort}${
                currentSearch ? `&search=${currentSearch}` : ""
              }`
            );
          }}
        />
      </div>
    </section>
  );
}
