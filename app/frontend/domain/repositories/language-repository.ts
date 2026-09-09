import type { Language } from "../entities/language";

export interface LanguageRepository {
  findAll(): Promise<Language[]>;
}
