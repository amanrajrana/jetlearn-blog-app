import React from "react";
import { Button, ButtonProps } from "./button";
import { LoaderCircle } from "lucide-react";

const SubmitButton = React.forwardRef<
  HTMLButtonElement,
  ButtonProps & { loading: boolean }
>(({ loading = false, children, ...props }, ref) => {
  return (
    <Button disabled={loading} ref={ref} {...props}>
      {loading && <LoaderCircle className="animate-spin" />}
      {children}
    </Button>
  );
});
SubmitButton.displayName = "SubmitButton";

export default SubmitButton;
