import axios from "axios";
import type { FetchResponse } from "./types";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api/v1",
});


export const getFolderTree = async () => {
  const {data} = await api.get<FetchResponse>("/folders/tree");
  return data;
};

export const getChildren = async (folderId: number | null) => {
  const id = folderId === null ? "root" : folderId;
  const { data } = await api.get<FetchResponse>(
    `/folders/${id}/children`
  );
  return data;
};
