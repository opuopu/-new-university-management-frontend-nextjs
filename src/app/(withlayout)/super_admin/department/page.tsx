"use client";
import TableProvider from "@/components/table/TableProvider";
import UMBreadCrumb from "@/components/ui/UMBreadCrumb";
import { columns, dataSource } from "@/constants/global";
import { useGetallDepartmentsQuery } from "@/redux/api/departmentApi";

import { Button } from "antd";
import Link from "next/link";

const ManageDepartmentPage = () => {
  const query = {};
  const { data }: any = useGetallDepartmentsQuery(query);
  console.log(data?.departments);

  return (
    <div>
      <UMBreadCrumb
        items={[
          {
            label: "super_admin",
            link: "/super_admin",
          },
        ]}
      />
      <h1>Department List</h1>
      <Link href="/super_admin/department/create">
        <Button type="primary">Create</Button>
        <TableProvider dataSource={data?.departments} columns={columns} />
      </Link>
    </div>
  );
};

export default ManageDepartmentPage;
