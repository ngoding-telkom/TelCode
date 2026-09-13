import type { Language } from "../../domain/entities/language";
import type { LanguageRepository } from "../../domain/repositories/language-repository";
import { getApiData } from "../http/api-client";

type LanguageResponse = {
  id: number;
  name: string;
  file_extension: string | null;
};

export class ApiLanguageRepository implements LanguageRepository {
  async findAll(): Promise<Language[]> {
    const languages = await getApiData<LanguageResponse[]>("/api/languages");

    return languages.map((language) => ({
      id: language.id,
      name: language.name,
      fileExtension: language.file_extension,
    }));
  }
}
