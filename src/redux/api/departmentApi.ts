import { baseApi } from "./baseApi";

const DEPARTMENT_URL = "/management-departments";

export const DepartmentApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createDepartment: build.mutation({
      query: (data) => ({
        url: `${DEPARTMENT_URL}`,
        method: "POST",
        data: data,
      }),
      invalidatesTags: ["department"],
    }),
    getallDepartments: build.query({
      query: (arg: Record<string, any>) => ({
        url: `${DEPARTMENT_URL}`,
        method: "GET",
        params: arg,
      }),
      transformResponse: (response: any, meta: any) => {
        return {
          departments: response.data,
          meta: response.meta,
        };
      },
    }),
  }),
});

export const { useCreateDepartmentMutation, useGetallDepartmentsQuery } =
  DepartmentApi;
