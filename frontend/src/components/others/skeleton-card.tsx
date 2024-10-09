import React from "react";
import { Skeleton } from "@/components";

interface SkeletonSectionProps {
  rows: number;
  className?: string;
}

const SkeletonSection: React.FC<SkeletonSectionProps> = ({
  rows,
  className,
}) => {
  return (
    <div className={className}>
      {Array.from({ length: rows }).map((_, index) => (
        <Skeleton key={index} className="h-4 w-full" />
      ))}
    </div>
  );
};

interface SkeletonCardProps {
  headerRows?: number;
  detailRows?: number;
  actionRows?: number;
}

const SkeletonCard: React.FC<SkeletonCardProps> = ({
  headerRows = 1,
  detailRows = 2,
  actionRows = 2,
}) => {
  return (
    <div className="p-8">
      <div className="flex flex-col w-full max-w-3xl mx-auto space-y-4">
        <Skeleton className="h-32 w-full rounded-lg" />

        <SkeletonSection rows={headerRows} className="space-y-2" />

        <SkeletonSection rows={detailRows} className="space-y-2" />

        <div className="flex space-x-4">
          {Array.from({ length: actionRows }).map((_, index) => (
            <Skeleton key={index} className="h-10 w-24 rounded-md" />
          ))}
        </div>
      </div>
    </div>
  );
};

export { SkeletonCard };
