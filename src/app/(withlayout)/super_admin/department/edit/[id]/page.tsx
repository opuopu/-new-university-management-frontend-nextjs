"use client";
import FormInput from "@/components/Forms/FormInput";
import Form from "@/components/Forms/Form";
import {
  useGetSingleDepartmentQuery,
  useUpdateDepartmentMutation,
} from "@/redux/api/departmentApi";
import { Button, Col, Row, message } from "antd";
import { useRouter } from "next/router";
import React from "react";

const EditDepartMent = ({ params }: any) => {
  const { id } = params;
  const { data, isLoading } = useGetSingleDepartmentQuery(id);
  const [updateDepartmentTitle, { error }] = useUpdateDepartmentMutation();
  const onSubmit = async (title: any) => {
    message.loading("creating...........");
    try {
      await updateDepartmentTitle({
        id,
        title,
      });

      message.success("department updated");
    } catch (err: any) {
      message.error(err.message);
    }
  };
  return (
    <div>
      <h1>Edit Here</h1>
      <Form submitHandler={onSubmit}>
        <Row gutter={{ xs: 24, xl: 8, lg: 8, md: 24 }}>
          <Col span={8} style={{ margin: "10px 0" }}>
            <FormInput name="title" label="Title" />
          </Col>
        </Row>
        <Button type="primary" htmlType="submit">
          edit
        </Button>
      </Form>
    </div>
  );
};

export default EditDepartMent;
