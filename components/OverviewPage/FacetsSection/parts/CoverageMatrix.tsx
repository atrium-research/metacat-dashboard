"use client";

import { MatrixCell } from "@/components/ui/MatrixCell/MatrixCell";
import { Typography } from "@/components/ui/Typography/Typography";
import { catalogueQueryOptions, useCatalogueList } from "@/hooks/useCatalogues";
import { useFacetList } from "@/hooks/useFacets";
import { getShortName, getThemeColor } from "@/utils/catalogue.utils";
import { useSuspenseQueries } from "@tanstack/react-query";
import clsx from "clsx";
import { ReactNode } from "react";
import {
  Cell,
  Column,
  Row,
  Table,
  TableBody,
  TableHeader,
} from "react-aria-components";

interface CoverageMatrixProps {
  shouldUseSkelton?: boolean;
}

export function CoverageMatrix({
  shouldUseSkelton,
}: CoverageMatrixProps): ReactNode {
  const { data: catalogues = [] } = useCatalogueList();
  const { data: facets = [] } = useFacetList();

  const catalogueVersions = useSuspenseQueries({
    queries: catalogues.map((cat) =>
      catalogueQueryOptions.versionsLast(
        cat.id as "ariadne" | "clarin-vlo" | "gotriple" | "sshomp",
      ),
    ),
  });

  return (
    <div className="flex p-8 gap-6 flex-col flex-1 max-w-200 bg-white-500 border border-beige-600 max-lg:overflow-auto">
      <div className="flex justify-between gap-4 sticky top-0 left-0">
        <div className="flex flex-col gap-1">
          <Typography variant="caption" className="uppercase">
            6 Pivot Facets
          </Typography>
          <Typography variant="h3">Coverage Matrix</Typography>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex gap-1.5">
            <span className="size-2.5 bg-black-500" />
            <Typography
              variant="caption"
              className="text-[0.5625rem] uppercase"
            >
              Exposed
            </Typography>
          </div>
          <div className="flex gap-1.5">
            <span className="size-2.5 bg-beige-400" />
            <Typography
              variant="caption"
              className="text-[0.5625rem] uppercase"
            >
              Gap
            </Typography>
          </div>
        </div>
      </div>

      {shouldUseSkelton ? (
        <div className="w-full h-40 bg-beige-600" />
      ) : (
        <Table
          aria-label="Facet coverage matrix"
          className="table-fixed max-lg:min-w-150"
        >
          <TableHeader>
            <Column id="Catalogue name" isRowHeader />
            {facets.map((facet) => (
              <Column key={facet} id={facet} className={"w-auto"}>
                <Typography
                  variant="caption"
                  className="text-[0.5625rem] uppercase"
                >
                  {facet}
                </Typography>
              </Column>
            ))}
          </TableHeader>
          <TableBody>
            {catalogueVersions.map((catalogueVersion) => {
              if (!catalogueVersion.data) return null;
              const { catalogue_id, facet_exposures } = catalogueVersion.data;
              const themeColor = getThemeColor(catalogue_id);
      
              return (
                <Row key={catalogue_id} id={catalogue_id}>
                  <Cell
                    className={clsx(
                      "min-w-25 max-w-40 uppercase text-h5 text-[0.875rem] max-lg:w-25",
                    )}
                  >
                    <div className="flex gap-2 items-center">
                      <span
                        className={`size-1.5 rounded-full bg-${themeColor}`}
                      />
                      {getShortName(catalogue_id)}
                    </div>
                  </Cell>
                  {facets.map((facet) => {
                    const exposure = facet_exposures.find((exposure) => exposure.facet === facet);

                    return (
                    <Cell
                      key={`${catalogue_id}_${facet}`}
                      className="w-15 md:w-18 lg:w-20"
                    >
                      <MatrixCell
                        variant="coverage"
                        hasValue={exposure?.status === "exposed"}
                        source={
                          catalogue_id as
                          | "ariadne"
                          | "clarin-vlo"
                          | "gotriple"
                          | "sshomp"
                        }
                      />
                    </Cell>
                  )})}
                </Row>
              );
            })}
          </TableBody>
        </Table>
      )}
    </div>
  );
}
