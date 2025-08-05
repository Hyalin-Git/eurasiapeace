"use client";
import Input from "@/ui/Input";
import { Search } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

export default function SearchBar({ placeholder }: { placeholder: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const pathname = usePathname();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value !== "") {
      params.set("page", "1");
      params.set("search", e.target.value.toLowerCase());
      router.push(`${pathname}?${params.toString()}`);
    } else {
      params.delete("search");
      router.push(`${pathname}?${params.toString()}`);
    }
  };

  // Debounced search
  const debouncedSearch = useDebouncedCallback((e) => handleSearch(e), 400);

  return (
    <div className="w-full">
      <form onChange={debouncedSearch} onSubmit={(e) => e.preventDefault()}>
        <Input
          type="text"
          id="search"
          configs={{
            icon: <Search size={20} className="input-icon" />,
            placeholder: placeholder,
          }}
        />
      </form>
    </div>
  );
}
