import type { Language } from "../../domain/entities/language";
import type { LanguageRepository } from "../../domain/repositories/language-repository";

export class GetLanguages {
  constructor(private readonly languageRepository: LanguageRepository) {}

  execute(): Promise<Language[]> {
    return this.languageRepository.findAll();
  }
}
