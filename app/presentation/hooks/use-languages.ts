"use client";

import { useEffect, useState } from "react";
import type { Language } from "../../domain/entities/language";
import { GetLanguages } from "../../application/use-cases/get-languages";
import { ApiLanguageRepository } from "../../infrastructure/repositories/api-language-repository";

type LanguagesState = {
  data: Language[];
  isLoading: boolean;
  error: string | null;
};

const initialState: LanguagesState = {
  data: [],
  isLoading: true,
  error: null,
};

export function useLanguages(): LanguagesState {
  const [state, setState] = useState(initialState);

  useEffect(() => {
    const useCase = new GetLanguages(new ApiLanguageRepository());

    useCase
      .execute()
      .then((data) => setState({ data, isLoading: false, error: null }))
      .catch((error: unknown) => {
        const message =
          error instanceof Error
            ? error.message
            : "Bahasa pemrograman gagal dimuat.";

        setState({ data: [], isLoading: false, error: message });
      });
  }, []);

  return state;
}
