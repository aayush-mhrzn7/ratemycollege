interface ActionResponse {
  type: "error" | "success";
  message: string;
  status: number;
}
interface DALResponse<T> {
  hasNext: boolean;
  hasPrev: boolean;
  count: number;
  data: T[];
}
export type { ActionResponse, DALResponse };
