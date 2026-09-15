import { Typography } from "@/components/ui/Typography/Typography";
import { useCatalogueFacets } from "@/hooks/useCatalogues";
import {
  Cell,
  Column,
  Row,
  Table,
  TableBody,
  TableHeader,
} from "react-aria-components";

interface ExposureTableProps {
  id: "ariadne" | "clarin-vlo" | "gotriple" | "sshomp";
}

const ExposureTable = ({ id }: ExposureTableProps) => {
  const { data: catalogueFacets } = useCatalogueFacets(id);
  return (
    <div className="flex flex-col flex-1 rounded-lg border border-beige-600 bg-white-500 gap-4 py-5 px-6 max-lg:overflow-auto">
      <Typography
        className="text-[0.625rem] text-gray-700 uppercase"
        variant="caption"
      >
        FACET EXPOSURE
      </Typography>
      <Table aria-label="Facet exposure table" className="max-lg:min-w-150">
        <TableHeader className="text-[0.5625rem] text-gray-500 font-jetbrains-mono font-medium leading-3 ">
          <Column id="facet" isRowHeader className="text-start pb-4">
            Facet
          </Column>
          <Column id="total" isRowHeader className="text-start pb-4">
            Total
          </Column>
          <Column id="values" isRowHeader className="text-start pb-4">
            Values
          </Column>
          <Column id="top value" isRowHeader className="text-start pb-4">
            Top value
          </Column>
        </TableHeader>
        <TableBody>
          {catalogueFacets?.map((facet) => {
            const {
              facet: facetName,
              status,
              total_count,
              values_count,
              top_value,
              top_value_count,
            } = facet;

            return (
              <Row
                key={facet.facet}
                id={facet.facet}
                className="border-t border-beige-600"
              >
                <Cell className="py-6 text-[0.8125rem] font-medium font-outfit leading-4 text-black-500 capitalize">
                  {facetName}
                </Cell>
                <Cell className="text-[0.75rem] text-black-500 font-medium font-jetbrains-mono leading-4 uppercase">
                  {status !== "gap"
                    ? total_count?.toLocaleString("pl-PL")
                    : status}
                </Cell>
                <Cell className="text-[0.75rem] text-black-500 font-medium font-jetbrains-mono leading-4">
                  {values_count}
                </Cell>
                <Cell>
                  {status !== "gap" ? (
                    <>
                      <span className="text-[0.5625rem] text-gray-500 font-jetbrains-mono leading-3">
                        top:
                      </span>
                      <span className="text-[0.75rem] text-black-500 font-medium font-outfit leading-3.75 px-2">
                        {top_value}
                      </span>{" "}
                      <span className="text-[0.625rem] text-gray-500 font-jetbrains-mono leading-3">
                        {top_value_count?.toLocaleString("pl-PL")}
                      </span>
                    </>
                  ) : null}
                </Cell>
              </Row>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default ExposureTable;
