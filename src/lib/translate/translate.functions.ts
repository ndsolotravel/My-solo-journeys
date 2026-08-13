import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requestTranslations } from "./gtx";

export const translateTexts = createServerFn({ method: "POST" })
  .inputValidator((input) =>
    z
      .object({
        lang: z.string().min(2).max(8),
        texts: z.array(z.string()).max(300).default([]),
      })
      .parse(input ?? {}),
  )
  .handler(async ({ data }) => {
    const map = await requestTranslations(data.texts, data.lang);
    const out: Record<string, string> = {};
    map.forEach((value, key) => {
      out[key] = value;
    });
    return out;
  });
