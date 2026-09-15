"use client";

import {
  type KeyboardEvent,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Autocomplete, useFilter } from "react-aria-components/Autocomplete";
import { type Key } from "react-aria-components/ListBox";

import {
  ListBox,
  ListBoxItem,
  ListBoxSection,
} from "@/components/ui/ListBox/ListBox";
import { listBoxEmptyStateVariants } from "@/components/ui/ListBox/ListBox.styles";
import { Popover } from "@/components/ui/Popover/Popover";
import { TextField } from "@/components/ui/TextField/TextField";
import { Typography } from "@/components/ui/Typography/Typography";
import { useOs } from "@/hooks/useOs";
import { cn } from "@/utils/global.utils";

export type SearchSuggestion = {
  id: string;
  label: string;
};

export type SearchSuggestionSection = {
  id: string;
  title: string;
  items: SearchSuggestion[];
};

const searchSuggestionSections: SearchSuggestionSection[] = [
  {
    id: "catalogues",
    title: "Catalogues",
    items: [
      { id: "ariadne", label: "ARIADNE Portal" },
      { id: "clarin", label: "CLARIN VLO" },
    ],
  },
  {
    id: "vocabularies",
    title: "Vocabularies",
    items: [
      { id: "aat", label: "Getty AAT" },
      { id: "periodo", label: "PeriodO" },
    ],
  },
  {
    id: "concepts",
    title: "Concepts",
    items: [{ id: "pottery", label: "Pottery" }],
  },
];

type SearchInputProps = {
  sections?: SearchSuggestionSection[];
  onSearch?: (query: string) => void;
  className?: string;
};

const logSearch = (query: string) => {
  console.log("Search:", query);
};

const renderEmptySuggestions = () => {
  return <div className={listBoxEmptyStateVariants()}>No matches</div>;
};

const SearchInput = ({
  sections = searchSuggestionSections,
  onSearch = logSearch,
  className,
}: SearchInputProps) => {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const popoverRef = useRef<HTMLElement>(null);

  const isMacOs = useOs() === "Mac";

  const { contains } = useFilter({ sensitivity: "base" });

  const suggestionsById = useMemo(() => {
    const entries = sections.flatMap((section) => {
      return section.items.map((item) => [item.id, item] as const);
    });

    return new Map(entries);
  }, [sections]);

  useEffect(() => {
    const handleShortcut = (event: globalThis.KeyboardEvent) => {
      if (event.repeat || event?.defaultPrevented) {
        return;
      }

      const isShortcut =
        event.key.toLowerCase() === "k" && (event.metaKey || event.ctrlKey);

      if (!isShortcut) {
        return;
      }

      event.preventDefault();

      inputRef.current?.focus();
      inputRef.current?.select();

      setIsOpen(true);
    };

    window.addEventListener("keydown", handleShortcut);

    return () => {
      window.removeEventListener("keydown", handleShortcut);
    };
  }, []);

  const search = (value: string) => {
    const trimmedValue = value.trim();

    if (!trimmedValue) {
      return;
    }

    setIsOpen(false);
    onSearch(trimmedValue);
  };

  const handleQueryChange = (value: string) => {
    setQuery(value);
    setIsOpen(true);
  };

  const handleSuggestionAction = (key: Key) => {
    const suggestion = suggestionsById.get(String(key));

    if (!suggestion) {
      return;
    }

    setQuery(suggestion.label);
    search(suggestion.label);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    switch (event.key) {
      case "Enter":
        search(query);
        break;
      case "ArrowDown":
        setIsOpen(true);
        break;
      case "Escape":
        if (isOpen) {
          setIsOpen(false);
        } else {
          setQuery("");
        }
        break;
      default:
        break;
    }
  };

  return (
    <Autocomplete
      filter={contains}
      inputValue={query}
      onInputChange={handleQueryChange}
      disableAutoFocusFirst
    >
      <div
        role="search"
        className={cn(
          "relative min-w-0 flex-1",
          "xl:order-1 xl:w-72 xl:flex-none",
          "2xl:w-100",
          className,
        )}
      >
        <TextField
          aria-label="Search"
          type="search"
          placeholder="Search fields, values, vocabularies..."
          inputRef={inputRef}
          onFocus={() => setIsOpen(true)}
          onBlur={() => setIsOpen(false)}
          onKeyDown={handleKeyDown}
          inputClassName={cn(
            "bg-beige-400 text-gray-500 pr-3",
            "[&::-webkit-search-cancel-button]:hidden",
            isMacOs ? "sm:pr-12.5" : "sm:pr-15",
          )}
        />

        <Typography
          as="kbd"
          variant="caption"
          aria-hidden="true"
          className={cn(
            "absolute top-1/2 right-3 -translate-y-1/2",
            "hidden sm:block",
            "rounded-sm border border-beige-600 bg-white-500",
            "px-1.5 py-0.5 text-gray-500",
          )}
        >
          {isMacOs ? "⌘" : "Ctrl"} K
        </Typography>
      </div>

      <Popover
        ref={popoverRef}
        triggerRef={inputRef}
        isOpen={isOpen}
        onOpenChange={setIsOpen}
        placement="bottom"
        isNonModal
        className="p-0 w-[calc(var(--trigger-width)*0.6)]"
      >
        <ListBox
          aria-label="Search suggestions"
          items={sections}
          onAction={handleSuggestionAction}
          renderEmptyState={renderEmptySuggestions}
        >
          {(section: SearchSuggestionSection) => (
            <ListBoxSection
              id={section.id}
              title={section.title}
              items={section.items}
            >
              {(item: SearchSuggestion) => (
                <ListBoxItem id={item.id}>{item.label}</ListBoxItem>
              )}
            </ListBoxSection>
          )}
        </ListBox>
      </Popover>
    </Autocomplete>
  );
};

export default SearchInput;
