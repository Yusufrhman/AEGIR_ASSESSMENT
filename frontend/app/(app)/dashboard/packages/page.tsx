"use client";
import Loader from "@/components/Loader";
import Pagination from "@/components/Pagination";
import Table from "@/components/table/Table";
import { fetchData } from "@/lib/services/api";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function PackagesPage() {
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
    queryKey: ["packages", currentPage],
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

  let packagesData = data.data.map((packageData: any) => {
    return {
      ...packageData,
      student_name:
        packageData.student.first_name + " " + packageData.student.last_name,
      instrument : packageData.instrument.name,
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
    <section className="min-h-[80svh] flex flex-col gap-0 items-center justify-center">
      <Table data={packagesData} columns={columns} />
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
