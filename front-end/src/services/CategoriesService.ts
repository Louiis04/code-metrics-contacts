import { ICategory } from "../@types/Category";
import api from "../configs/api";

type orderBy = "ASC" | "DESC";

interface IGetCategoriesParams {
  orderBy?: orderBy;
}

class CategoriesService {
  async getCategories(params: IGetCategoriesParams = { orderBy: "ASC" }) {
    const response = await api.get<ICategory[]>("/categories", { params });
    return response.data;
  }
  
  async createCategory({ name }: { name: string }) {
    const response = await api.post<ICategory>("/categories", { name });
    return response.data;
  }
}

export default new CategoriesService();