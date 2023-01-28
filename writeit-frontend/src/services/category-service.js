import { myaxios } from "./helper";

export const LoadAllCategoriesFunc = () => {
  return myaxios.get("/api/categories").then((response) => {
    return response.data;
  });
};
