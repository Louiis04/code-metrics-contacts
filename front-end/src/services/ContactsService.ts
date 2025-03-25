import { IContact } from "../@types/Contact";
import api from "../configs/api";

type orderBy = "ASC" | "DESC";

interface IGetContactsParams {
  name?: string;
  orderBy?: orderBy;
}

interface ICreateContactParams {
  name: string;
  email: string;
  phone: string;
  category_id?: string;
}

class ContactsService {
  async getContacts(params: IGetContactsParams) {
    const response = await api.get<IContact[]>("/contacts", { params });
    return response.data;
  }

  async createContact(data: ICreateContactParams) {
    const response = await api.post<IContact>("/contacts", data);
    return response.data;
  }
}

export default new ContactsService();

export type { orderBy };
