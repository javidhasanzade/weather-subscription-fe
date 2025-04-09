"use client";
import React, {
  useCallback,
  useState,
  forwardRef,
  useEffect,
  useMemo,
  useRef,
} from "react";
import { useVirtualizer } from "@tanstack/react-virtual";

// shadcn
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

// utils
import { cn } from "@/lib/utils";

// assets
import { CheckIcon, ChevronDown, Loader2 } from "lucide-react";

interface CityDropdownProps {
  options: string[];
  onChange?: (city: string) => void;
  defaultValue?: string;
  disabled?: boolean;
  placeholder?: string;
  isLoading?: boolean;
}

const CityDropdownComponent = (
  {
    options = [],
    onChange,
    defaultValue,
    disabled = false,
    placeholder = "Select a city",
    isLoading = false,
    ...props
  }: CityDropdownProps,
  ref: React.ForwardedRef<HTMLButtonElement>
) => {
  const [open, setOpen] = useState(false);
  const [selectedCity, setSelectedCity] = useState<string | undefined>(
    undefined
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [isInitializing, setIsInitializing] = useState(true);
  const previousOpen = useRef(open);

  // Filter cities based on search query
  const filteredCities = useMemo(() => {
    if (!searchQuery) return options;
    const lowerQuery = searchQuery.toLowerCase();
    return options.filter((city) => city.toLowerCase().includes(lowerQuery));
  }, [options, searchQuery]);

  useEffect(() => {
    if (defaultValue) {
      setSelectedCity(defaultValue);
    } else {
      setSelectedCity(undefined);
    }
  }, [defaultValue]);

  // Set initializing to false after initial render
  useEffect(() => {
    if (isInitializing) {
      const timer = setTimeout(() => {
        setIsInitializing(false);
      }, 200); // Short delay to allow for initial rendering
      return () => clearTimeout(timer);
    }
  }, [isInitializing]);

  const handleSelect = useCallback(
    (city: string) => {
      setSelectedCity(city);
      onChange?.(city);
      setOpen(false);
    },
    [onChange]
  );

  const triggerClasses = cn(
    "flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1"
  );

  // Create a container ref for the virtual list
  const listRef = React.useRef<HTMLDivElement>(null);

  // Set up virtualization
  const rowVirtualizer = useVirtualizer({
    count: filteredCities.length,
    getScrollElement: () => listRef.current,
    estimateSize: () => 36, // Approximate height of each item
    overscan: 20, // Increased overscan for better UX
  });

  // Reset virtualization when the dropdown opens or search changes
  useEffect(() => {
    if (open && !previousOpen.current) {
      // Dropdown just opened, reset scroll and force update virtualization
      if (listRef.current) {
        listRef.current.scrollTop = 0;
      }
      rowVirtualizer.measure();
    }
    previousOpen.current = open;
  }, [open, rowVirtualizer]);

  // Reset virtualization when search or options change
  useEffect(() => {
    if (open) {
      setTimeout(() => {
        rowVirtualizer.measure();
      }, 50);
    }
  }, [searchQuery, options, open, rowVirtualizer]);

  return (
    <Popover
      open={open}
      onOpenChange={(openState) => {
        setOpen(openState);
        if (openState) {
          // Reset search when opening
          setSearchQuery("");
          // Force measure on next tick
          setTimeout(() => rowVirtualizer.measure(), 10);
        }
      }}
    >
      <PopoverTrigger
        ref={ref}
        className={triggerClasses}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? (
          <div className="flex items-center justify-between w-full">
            <span className="text-muted-foreground">Loading cities...</span>
            <Loader2 className="w-4 h-4 animate-spin" />
          </div>
        ) : selectedCity ? (
          <div className="flex items-center flex-grow w-0 gap-2 overflow-hidden">
            {selectedCity}
          </div>
        ) : (
          <span>{placeholder}</span>
        )}
        {!isLoading && <ChevronDown size={16} />}
      </PopoverTrigger>
      <PopoverContent
        collisionPadding={10}
        side="bottom"
        className="min-w-[--radix-popper-anchor-width] p-0"
        onOpenAutoFocus={(e) => {
          // Prevent auto-focus to avoid keyboard popping up on mobile
          e.preventDefault();
        }}
      >
        <Command className="w-full">
          <div className="sticky top-0 z-10 bg-popover">
            <CommandInput
              placeholder="Search city..."
              value={searchQuery}
              onValueChange={setSearchQuery}
              autoFocus={false}
            />
          </div>
          <CommandList className="max-h-[300px] overflow-auto" ref={listRef}>
            {isLoading || isInitializing ? (
              <div className="flex items-center justify-center p-6 text-sm text-muted-foreground">
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Loading cities...
              </div>
            ) : filteredCities.length === 0 ? (
              <CommandEmpty>No city found.</CommandEmpty>
            ) : (
              <CommandGroup>
                {/* Create a div with total height of all items */}
                <div
                  style={{
                    height: `${rowVirtualizer.getTotalSize()}px`,
                    width: "100%",
                    position: "relative",
                  }}
                >
                  {rowVirtualizer.getVirtualItems().map((virtualItem) => {
                    const city = filteredCities[virtualItem.index];
                    return (
                      <CommandItem
                        key={virtualItem.index}
                        className="flex items-center w-full gap-2 absolute top-0 left-0 right-0"
                        style={{
                          height: `${virtualItem.size}px`,
                          transform: `translateY(${virtualItem.start}px)`,
                        }}
                        onSelect={() => handleSelect(city)}
                        data-active={city === selectedCity}
                      >
                        <div className="flex flex-grow w-0 space-x-2 overflow-hidden">
                          {city}
                          <CheckIcon
                            className={cn(
                              "ml-auto h-4 w-4 shrink-0",
                              city === selectedCity
                                ? "opacity-100"
                                : "opacity-0"
                            )}
                          />
                        </div>
                      </CommandItem>
                    );
                  })}
                </div>
              </CommandGroup>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

CityDropdownComponent.displayName = "CityDropdownComponent";

export const CityDropdown = forwardRef(CityDropdownComponent);
