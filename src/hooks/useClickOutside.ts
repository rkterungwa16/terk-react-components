import { RefObject, useEffect } from "react";

export function useClickOutside({
  sidebarContainerRef,
  action,
}: {
  sidebarContainerRef: RefObject<HTMLElement | null>;
  mainContainerRef?: RefObject<HTMLElement | null>;
  toggleButtonRef?: RefObject<HTMLElement | null>;
  action?: () => void;
}) {
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as Node;
      if (
        target.nodeName !== "BUTTON" &&
        action &&
        sidebarContainerRef.current &&
        !sidebarContainerRef.current.isSameNode(event.target as Node)
      ) {
        action();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [action, sidebarContainerRef]);
}
