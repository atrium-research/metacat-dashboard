import { MatrixCell } from "@/components/ui/MatrixCell/MatrixCell";
import { catalogueQueryOptions, useCatalogueList } from "@/hooks/useCatalogues";
import { useVocabularyList } from "@/hooks/useVocabularies";
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

export function UsageTable(): ReactNode {
  const { data: vocabularies = [] } = useVocabularyList();
  const { data: catalogues } = useCatalogueList();

  const catalogueVersions = useSuspenseQueries({
    queries: catalogues.map((cat) =>
      catalogueQueryOptions.versionsLast(cat.id),
    ),
  });

  const ariadne = catalogueVersions.find(
    (catalogue) => catalogue.data.catalogue_id === "ariadne",
  )?.data;
  const clarinVlo = catalogueVersions.find(
    (catalogue) => catalogue.data.catalogue_id === "clarin-vlo",
  )?.data;
  const gotriple = catalogueVersions.find(
    (catalogue) => catalogue.data.catalogue_id === "gotriple",
  )?.data;
  const sshomp = catalogueVersions.find(
    (catalogue) => catalogue.data.catalogue_id === "sshomp",
  )?.data;

  return (
    <Table className="max-lg:min-w-200 w-full">
      <TableHeader
        className={clsx(
          "bg-white-500 border-y border-beige-600 [&>th]:py-4 [&>th]:px-6",
          "text-caption-meta leading-3.25 font-bold font-jetbrains-mono text-gray-700",
        )}
      >
        <Column
          id="Vocabulary"
          isRowHeader
          className="text-start py-3 px-6 uppercase"
        >
          Vocabulary
        </Column>
        <Column id="Authority" className="text-start py-3 px-1.5 uppercase">
          Authority
        </Column>
        <Column id="ARIADNE" className="py-3 px-1.5 uppercase">
          ARIADNE
        </Column>
        <Column id="CLARIN" className="py-3 px-1.5 uppercase">
          CLARIN
        </Column>
        <Column id="GOTRIPLE" className="py-3 px-1.5 uppercase">
          GOTRIPLE
        </Column>
        <Column id="SSHOMP" className="py-3 px-1.5 pr-6 uppercase">
          SSHOMP
        </Column>
      </TableHeader>
      <TableBody className="[&>tr>td]:py-3 [&>tr>td]:px-1.5">
        {vocabularies.map((vocabulary) => {
          const usedForAriadne =
            ariadne?.vocabularies.includes(vocabulary.id) ?? false;
          const usedForClarin =
            clarinVlo?.vocabularies.includes(vocabulary.id) ?? false;
          const usedForGoTriple =
            gotriple?.vocabularies.includes(vocabulary.id) ?? false;
          const usedForSshomp =
            sshomp?.vocabularies.includes(vocabulary.id) ?? false;

          return (
            <Row key={vocabulary.id} className="border-y border-beige-600">
              <Cell className="text-h5 text-[0.875rem] text-black-500 font-outfit min-w-25 w-147.5 px-6!">
                {vocabulary.name}
              </Cell>
              <Cell className="text-body text-[0.8125rem] font-outfit min-w-25 w-87">
                {vocabulary.authority}
              </Cell>
              <Cell className="w-15 md:w-18 lg:w-20">
                <MatrixCell
                  variant="coverage"
                  source="ariadne"
                  hasValue={usedForAriadne}
                />
              </Cell>
              <Cell className="w-15 md:w-18 lg:w-20">
                <MatrixCell
                  variant="coverage"
                  source="clarin-vlo"
                  hasValue={usedForClarin}
                />
              </Cell>
              <Cell className="w-15 md:w-18 lg:w-20">
                <MatrixCell
                  variant="coverage"
                  source="gotriple"
                  hasValue={usedForGoTriple}
                />
              </Cell>
              <Cell className="w-15 md:w-18 lg:w-20 pr-6!">
                <MatrixCell
                  variant="coverage"
                  source="sshomp"
                  hasValue={usedForSshomp}
                />
              </Cell>
            </Row>
          );
        })}
      </TableBody>
    </Table>
  );
}
