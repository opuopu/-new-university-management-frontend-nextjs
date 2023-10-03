"use client";
import TableProvider from "@/components/table/TableProvider";
import UMBreadCrumb from "@/components/ui/UMBreadCrumb";

import {
  useDeleteDepartmentMutation,
  useGetSingleDepartmentQuery,
  useGetallDepartmentsQuery,
} from "@/redux/api/departmentApi";
import {
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  ReloadOutlined,
} from "@ant-design/icons";
import { useDebounced } from "@/redux/hooks";

import { Button, Input, message } from "antd";
import Link from "next/link";
import { useState } from "react";
import ActionBar from "@/components/ui/ActionBar";

const ManageDepartmentPage = () => {
  const [searchTerm, setInputValue] = useState("");
  const query: Record<string, any> = {};
  query["searchTerm"] = searchTerm;
  const debouncedTerm = useDebounced({
    searchQuery: searchTerm,
    delay: 2000,
  });
  console.log(searchTerm);
  if (!!debouncedTerm) query["searchTerm"] = debouncedTerm;
  const { data }: any = useGetallDepartmentsQuery({ ...query });
  const [deleteDepartment] = useDeleteDepartmentMutation();

  const deleteHandler = async (id: string) => {
    message.loading("deleting..........");
    try {
      await deleteDepartment(id);
      message.loading("department deleted successfully");
    } catch (err: any) {
      message.error(err.message);
    }
  };
  const columns = [
    {
      title: "Department Title",
      dataIndex: "title",
    },
    {
      title: "CreatedAt",
      dataIndex: "createdAt",
    },
    {
      title: "Action",
      render: function (data: any) {
        return (
          <>
            <Link href={`/super_admin/department/edit/${data?.id}`}>
              <Button
                style={{
                  margin: "0px 5px",
                }}
                onClick={() => console.log(data)}
                type="primary"
              >
                <EditOutlined />
              </Button>
            </Link>
            <Button
              onClick={() => deleteHandler(data?.id)}
              type="primary"
              danger
            >
              <DeleteOutlined />
            </Button>
          </>
        );
      },
    },
  ];

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
      <ActionBar title="Create Department">
        <Link href="/super_admin/department/create">
          <Button type="primary">Create Department</Button>
        </Link>
      </ActionBar>

      <h1>Department List</h1>
      <div>
        <Input
          placeholder="search here"
          style={{
            width: "20%",
          }}
          onChange={(e) => {
            setInputValue(e.target.value);
          }}
        />
      </div>

      <TableProvider dataSource={data?.departments} columns={columns} />
    </div>
  );
};

export default ManageDepartmentPage;
