"use client";

import { Controller, useFormContext } from "react-hook-form";
import { ScrollText } from "lucide-react";
import { SectionTitle } from "../section-title";
import { Editor } from "@/components/ui/editor";

export const SummarySection = () => {
  const { control } = useFormContext();
  return (
    <div>
      <SectionTitle title="Sobre Voce" icon={ScrollText} />

      <Controller
        control={control}
        name="content.summary"
        render={({ field }) => (
          <Editor {...field} className="min-h-[200px] max-h-[300px] mt-4" />
        )}
      />
    </div>
  );
};
