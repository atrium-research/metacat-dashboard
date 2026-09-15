import { Button } from "@/components/ui/Button/Button";
import { Typography } from "@/components/ui/Typography/Typography";

interface ErrorScreenProps {
  errorState: string;
  refetch: () => void;
}

const ErrorScreen = ({ refetch, errorState }: ErrorScreenProps) => (
  <main className="flex flex-col m-6 rounded-lg border border-beige-600 bg-white-100 p-6 gap-10 min-h-88 h-full justify-center items-center">
    <Typography
      as="h1"
      className="text-[1.125rem] flex items-center gap-2"
      variant="h2"
    >
      <span className="size-3 bg-primary rounded-full" />
      API unavailable
    </Typography>

    <Typography className="text-[0.875rem]" variant="body">
      The harvest pipeline is not responding. Data shown may be stale.
    </Typography>

    <Button className="uppercase" onClick={refetch}>
      Retry
    </Button>

    {errorState && <Typography variant="caption">{errorState}</Typography>}
  </main>
);

export default ErrorScreen;
