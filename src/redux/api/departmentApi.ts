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
      providesTags: ["department", "deleteDepartment", "updateDepartment"],
      transformResponse: (response: any, meta: any) => {
        return {
          departments: response.data,
          meta: response.meta,
        };
      },
    }),
    getSingleDepartment: build.query({
      query: (id) => ({
        url: `${DEPARTMENT_URL}/${id}`,
        method: "GET",
      }),
      providesTags: ["department", "deleteDepartment"],
    }),
    updateDepartment: build.mutation({
      query: (data) => ({
        url: `${DEPARTMENT_URL}/${data.id}`,
        method: "PATCH",
        data: data.title,
      }),
      invalidatesTags: ["updateDepartment"],
    }),
    deleteDepartment: build.mutation({
      query: (id) => ({
        url: `${DEPARTMENT_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["deleteDepartment"],
    }),
  }),
});

export const {
  useCreateDepartmentMutation,
  useGetallDepartmentsQuery,
  useGetSingleDepartmentQuery,
  useUpdateDepartmentMutation,
  useDeleteDepartmentMutation,
} = DepartmentApi;
