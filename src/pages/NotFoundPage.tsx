import { Link } from "react-router-dom";
import { LuHouse, LuTelescope } from "react-icons/lu";

import { StatePanel } from "@/components/states";
import { Button } from "@/components/ui/button";

export default function NotFoundPage() {
  return (
    <StatePanel
      icon={LuTelescope}
      title="Lost in hyperspace"
      description="That page is not on any star chart. Head back to the archive to keep exploring."
      action={
        <Button asChild variant="outline" size="sm">
          <Link to="/">
            <LuHouse aria-hidden />
            Back to all planets
          </Link>
        </Button>
      }
    />
  );
}
