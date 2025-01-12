"use client";

import Loader from "@/components/Loader";
import Pagination from "@/components/Pagination";
import FilterSelect from "@/components/table/FilterSelect";
import SearchInput from "@/components/table/SearchInput";
import Table from "@/components/table/Table";
import { fetchData } from "@/lib/services/api";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function UsersPage({}) {
  const params = useSearchParams();
  const router = useRouter();
  const session = useSession();

  const currentSearch = params.get("search") || "";
  const currentRole = params.get("role") || "";
  const [currentPage, setCurrentPage] = useState(
    parseInt(params.get("page") || "1")
  );
  const limit = 10;

  useEffect(() => {
    if (currentPage < 1) {
      setCurrentPage(1);
      router.push("?page=1");
    }
  }, [currentPage]);

  const { data, isLoading } = useQuery({
    queryKey: ["users", currentPage, currentRole, currentSearch],
    queryFn: () =>
      fetchData(
        "users",
        {
          "filter[email][_nnull]": true,
          ...(currentRole && { "filter[role][name][_eq]": currentRole }),
          ...(currentSearch && {
            "filter[first_name][_icontains]": currentSearch,
          }),
          page: currentPage,
          fields: ["id", "first_name", "last_name", "email", "role.name"],
          limit: limit,
          meta: "filter_count",
        },
        session?.data?.access_token as string
      ),
  });

  const columns = [
    { field: "full_name", header: "Full Name" },
    { field: "email", header: "Email" },
    { field: "user_role", header: "Role" },
  ];

  const userData = data?.data.map((user: any) => {
    return {
      ...user,
      full_name: `${user.first_name} ${user.last_name}`,
      user_role: user.role.name,
    };
  });

  return (
    <section className="min-h-[80svh] flex flex-col items-start justify-center">
      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row items-start justify-start gap-2 md:gap-4 my-5">
        <SearchInput
          defaultValue={currentSearch}
          onSearch={(value) => {
            router.push(
              `?page=1${currentRole ? `&role=${currentRole}` : ""}${
                value ? `&search=${value}` : ""
              }`
            );
          }}
        />

        <FilterSelect
          filter="role"
          options={[
            { label: "All", value: "" },
            { label: "Student", value: "Student" },
            { label: "Teacher", value: "Teacher" },
          ]}
          defaultValue={currentRole}
          onFilterChange={(value) => {
            router.push(
              `?page=1${value ? `&role=${value}` : ""}${
                currentSearch ? `&search=${currentSearch}` : ""
              }`
            );
          }}
        />
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center min-h-[50svh]">
          <Loader />
        </div>
      ) : (
        <>
          {/* Table */}
          <Table data={userData} columns={columns} />

          {/* Pagination */}
          <div className="w-full mx-auto">
            <Pagination
              currentPage={currentPage}
              totalPages={Math.ceil(data.meta.filter_count / limit)}
              onPageChange={(page) => {
                setCurrentPage(page);
                router.push(
                  `?page=${page}${currentRole ? `&role=${currentRole}` : ""}${
                    currentSearch ? `&search=${currentSearch}` : ""
                  }`
                );
              }}
            />
          </div>
        </>
      )}
    </section>
  );
}
