import { cn } from "@/lib/utils";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "../ui/input-group";
import { Search } from "lucide-react";

type Props = {
  placeholder?: string;
  defaultValue?: string;
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
};
export const SearchBar = ({
  placeholder,
  defaultValue,
  value,
  onChange,
  className,
}: Props) => {
  return (
    <div className={cn("relative", className)}>
      <InputGroup>
        <InputGroupInput
          type="text"
          placeholder={placeholder}
          defaultValue={defaultValue}
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
        />
        <InputGroupAddon>
          <Search className="h-4 w-4" />
        </InputGroupAddon>
      </InputGroup>
    </div>
  );
};
