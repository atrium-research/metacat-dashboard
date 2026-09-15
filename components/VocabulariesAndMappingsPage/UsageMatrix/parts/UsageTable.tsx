import { MatrixCell } from "@/components/ui/MatrixCell/MatrixCell";
import { useVocabularyList } from "@/hooks/useVocabularies";
import { getGrouppedVocabularies } from "@/utils/vocabulary.utils";
import clsx from "clsx";
import { Fragment, ReactNode } from "react";
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

  const grouppedVocabularies = getGrouppedVocabularies(vocabularies);

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
        <Column id="Concepts" className="text-end py-3 px-1.5 uppercase">
          Concepts
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
        {Object.keys(grouppedVocabularies).map((facet) => {
          return (
            <Fragment key={facet}>
              <Row>
                <Cell
                  colSpan={7}
                  className={clsx(
                    "bg-beige-500 border-y border-beige-600 py-2 px-6! uppercase",
                    "text-caption font-bold font-jetbrains-mono text-gray-700",
                  )}
                >
                  {facet}
                </Cell>
              </Row>
              {grouppedVocabularies[facet].map((vocabularies) => {
                const usedForAriadne =
                  vocabularies.used_by_catalogues.includes("ariadne");
                const usedForClarin =
                  vocabularies.used_by_catalogues.includes("clarin-vlo");
                const usedForGoTriple =
                  vocabularies.used_by_catalogues.includes("gotriple");
                const usedForSshomp =
                  vocabularies.used_by_catalogues.includes("sshomp");

                return (
                  <Row
                    key={vocabularies.id}
                    className="border-y border-beige-600"
                  >
                    <Cell className="text-h5 text-[0.875rem] text-black-500 font-outfit min-w-25 w-147.5 px-6!">
                      {vocabularies.name}
                    </Cell>
                    <Cell className="text-body text-[0.8125rem] font-outfit min-w-25 w-87">
                      {vocabularies.authority}
                    </Cell>
                    <Cell className="text-caption-link text-[0.8125rem] min-w-25 w-33.5 text-end">
                      {vocabularies.concepts_count.toLocaleString("pl-PL")}
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
            </Fragment>
          );
        })}
      </TableBody>
    </Table>
  );
}
