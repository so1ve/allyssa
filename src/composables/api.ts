import type { AllyssaDocument } from "@/types";

export const newDocument = async(name: string): Promise<null | string> => {
  return await invoke("new_document", { name });
};

export const getDocuments = async(): Promise<string[]> => {
  return await invoke("get_documents");
};

export const getDocument = async(name: string): Promise<AllyssaDocument> => {
  return await invoke("get_document", { name });
};
