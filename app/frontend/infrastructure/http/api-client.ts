export class ApiError extends Error {
  constructor(
    message: string,
    readonly status: number,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

export async function getApiData<T>(path: string): Promise<T> {
  const response = await fetch(path);
  const body = (await response.json()) as { data?: T; error?: string };

  if (!response.ok) {
    throw new ApiError(
      body.error ?? "Permintaan ke server gagal.",
      response.status,
    );
  }

  if (body.data === undefined) {
    throw new ApiError("Respons server tidak memiliki data.", response.status);
  }

  return body.data;
}
