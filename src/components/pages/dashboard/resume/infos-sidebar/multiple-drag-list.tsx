"use client";

import { useFieldArray, useFormContext } from "react-hook-form";
import { GripVertical, LucideIcon } from "lucide-react";
import {
  DragDropContext,
  Draggable,
  DropResult,
  Droppable,
} from "@hello-pangea/dnd";
import { SectionTitle } from "./section-title";
import { cn } from "@/lib/utils";

export type ResumeArrayKeys = Exclude<
  keyof ResumeContentData,
  "image" | "infos" | "summary"
>;

export type MultipleDragItemData = {
  formKey: ResumeArrayKeys;
  title: string;
  icon: LucideIcon;
  titleKey: string;
  descriptionKey: string;
};

type MultipleDragListProps = {
  data: MultipleDragItemData;
  onAdd: () => void;
  onEdit: (index: number) => void;
};

export const MultipleDragList = ({
  data,
  onAdd,
  onEdit,
}: MultipleDragListProps) => {
  const { control } = useFormContext<ResumeData>();

  const { fields, move } = useFieldArray({
    control,
    name: `content.${data.formKey}`,
  });

  const handleDrag = ({ source, destination }: DropResult) => {
    if (!destination) return;
    move(source.index, destination.index);
  };
  return (
    <div>
      <SectionTitle title={data.title} icon={data.icon} />

      <div className="mt-4 flex flex-col">
        {!!fields.length && (
          <DragDropContext onDragEnd={handleDrag}>
            <Droppable droppableId={`droppable-${data.formKey}`}>
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="rounded overflow-hidden border border-muted"
                >
                  {fields.map((field, index) => {
                    const titleKey = data.titleKey as keyof typeof field;
                    const descriptionKey =
                      data.descriptionKey as keyof typeof field;

                    const isLastItem = index === fields.length - 1;

                    return (
                      <Draggable
                        key={`draggable-item-${data.formKey}-${index}`}
                        draggableId={`draggable-item-${data.formKey}-${index}`}
                        index={index}
                      >
                        {(provided) => (
                          <div
                            key={field.id}
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            className={cn(
                              "h-16 w-full bg-muted/50 flex",
                              !isLastItem && "border-b border-muted"
                            )}
                          >
                            <div
                              {...provided.dragHandleProps}
                              className="w-6 h-full bg-muted/50 flex items-center justify-center hover:brightness-125 transition-all"
                            >
                              <GripVertical size={14} />
                            </div>

                            <div className="flex-1 flex flex-col justify-center px-3 cursor-pointer hover:bg-muted/80 transition-all">
                              <p className="text-sm font-title font-bold">
                                {field[titleKey]}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                {field[descriptionKey]}
                              </p>
                            </div>
                          </div>
                        )}
                      </Draggable>
                    );
                  })}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        )}
      </div>
    </div>
  );
};
