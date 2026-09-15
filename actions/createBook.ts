"use server";

import { z } from "zod";

const bookSchema = z.object({
  title: z
    .string()
    .trim()
    .min(3, "Tytuł musi mieć co najmniej 3 znaki")
    .max(30, "Tytuł nie może przekraczać 30 znaków"),
  description: z
    .string()
    .trim()
    .min(3, "Opis musi mieć co najmniej 3 znaki")
    .max(100, "Opis nie może przekraczać 100 znaków"),
});

export type BookFormState = {
  errors?: {
    title?: string[];
    description?: string[];
  };
  fields?: {
    title?: string;
    description?: string;
  };
  message?: string;
  success?: boolean;
};

export async function createBook(
  _prevState: BookFormState,
  formData: FormData,
): Promise<BookFormState> {
  const rawData = {
    title: (formData.get("title") as string) || "",
    description: (formData.get("description") as string) || "",
  };

  const validatedFields = bookSchema.safeParse(rawData);

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten((issue) => issue.message).fieldErrors,
      fields: rawData,
      success: false,
    };
  }

  await new Promise((resolve) => setTimeout(resolve, 2000));

  return {
    success: true,
    message: "Książka została pomyślnie dodana!",
  };
}
