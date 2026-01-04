import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "../ui/button";
import { ButtonGroup } from "../ui/button-group";

type Props = {
  onPrevious?: () => void;
  onNext?: () => void;
};
export const PaginationButtonGroup = ({ onPrevious, onNext }: Props) => {
  if (!onPrevious && !onNext) {
    return null;
  }
  return (
    <ButtonGroup>
      <Button
        variant="outline"
        className="md:after:content-['Previous']"
        onClick={onPrevious}
        disabled={!onPrevious}
      >
        <ArrowLeft className="h-4 w-4" />
      </Button>
      <Button
        variant="outline"
        className="md:after:content-['Next']"
        onClick={onNext}
        disabled={!onNext}
      >
        <ArrowRight className="h-4 w-4" />
      </Button>
    </ButtonGroup>
  );
};
