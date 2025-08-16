import { RefObject, useEffect } from "react";

export function useClickOutside({
  overlayContainerRef,
  action,
}: {
  overlayContainerRef?: RefObject<HTMLElement | null>;
  action?: () => void;
}) {
  useEffect(() => {
    const doc = overlayContainerRef?.current;
    function handleClickOutside() {
      if (action && doc) {
        action();
      }
    }
    doc?.addEventListener("mousedown", handleClickOutside);
    return () => {
      doc?.removeEventListener("mousedown", handleClickOutside);
    };
  }, [action, overlayContainerRef]);
}
