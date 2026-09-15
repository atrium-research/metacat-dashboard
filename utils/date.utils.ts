import { formatDistanceToNowStrict } from "date-fns";
import { enUS } from "date-fns/locale";

export const formatRelativeDate = (from: Date, withShortSuffix = false) => {
  const relativeDate = formatDistanceToNowStrict(from, {
    addSuffix: true,
    locale: enUS,
  });

  if (!withShortSuffix) return relativeDate;

  return relativeDate
    .replace(/\s*seconds?/, "s")
    .replace(/\s*minutes?/, "m")
    .replace(/\s*hours?/, "h")
    .replace(/\s*days?/, "d")
    .replace(/\s*months?/, "mo")
    .replace(/\s*years?/, "y");
};

const fullDateTimeFormatter = new Intl.DateTimeFormat("en-GB", {
  day: "2-digit",
  month: "short",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
  timeZone: "UTC",
});

export const formatDateToFullString = (date: Date, withUTCTimeZone = true) => {
  const formattedDate = fullDateTimeFormatter.format(date);

  if (!withUTCTimeZone) return formattedDate;
  return `${formattedDate} UTC`;
};

const monthLabelFormatter = new Intl.DateTimeFormat("en", {
  month: "short",
  year: "2-digit",
  timeZone: "UTC",
});

export const formatMonthLabel = (date: Date) => {
  return monthLabelFormatter.format(date);
};
