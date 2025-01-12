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

export default function PaymentsPage() {
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
    queryKey: ["payments", currentPage],
    queryFn: () =>
      fetchData(
        "items/payments",
        {
          sort: "-payment_date",
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

  let paymentsData = data.data.map((payment: any) => {
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
    <section className="min-h-[80svh] flex flex-col gap-0 items-center justify-center">
      <Table data={paymentsData} columns={columns} />
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
