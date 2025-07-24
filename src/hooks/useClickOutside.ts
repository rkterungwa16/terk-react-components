import { RefObject, useEffect } from "react";

export function useClickOutside({
  sidebarContainerRef,
  action,
  mainContainerRef,
}: {
  sidebarContainerRef: RefObject<HTMLElement | null>;
  mainContainerRef: RefObject<HTMLElement | null>;
  toggleButtonRef?: RefObject<HTMLElement | null>;
  action?: () => void;
}) {
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as Node;
      if (
        target.nodeName !== 'BUTTON' &&
        action &&
        sidebarContainerRef.current &&
        !sidebarContainerRef.current.contains(event.target as Node)
      ) {
        action();
      }
    }
    mainContainerRef.current?.addEventListener("mousedown", handleClickOutside);
    return () => {
      mainContainerRef.current?.removeEventListener("mousedown", handleClickOutside);
    };
  }, [sidebarContainerRef.current, action]);
}
