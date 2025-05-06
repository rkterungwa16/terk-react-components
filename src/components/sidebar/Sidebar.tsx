import {
  FC,
  ReactElement,
  Ref,
  RefObject,
  useEffect,
  useRef,
  useState,
} from "react";
import { Transition } from "react-transition-group";
import { useClickOutside } from "../../hooks/useClickOutside";
import { ITransitionStyle } from "./types";

import "./styles.css";

interface ISidebar {
  isClose: boolean;
  timeout?: number;
  theme?: {
    sidebar: {
      dark: {
        color: string;
        backgroundColor: string;
      };
      light: {
        color: string;
        backgroundColor: string;
      };
    };
  };
  themeMode?: "dark" | "light";
  size?: "sm" | "lg" | "xl";
  width?: number;
  className?: string;
  handleClose?: () => void;
  renderChildren?: ({
    ref,
    style,
    props,
  }: {
    ref?: RefObject<HTMLDivElement | null> | Ref<HTMLDivElement | null>;
    style: {
      opacity: number;
      transform?: string;
    };
    props?: Record<string, unknown>;
    classes?: string[];
  }) => ReactElement;
}
const Sidebar: FC<ISidebar> = (props) => {
  const [isClose, setClose] = useState(props.isClose);

  const transitionStyles: ITransitionStyle = {
    entering: { opacity: 1, transform: `translateX(-${props.width}px)` },
    entered: { opacity: 1, transform: `translateX(-${props.width}px)` },
    exiting: { opacity: 1 },
    exited: { opacity: 1 },
  };

  useEffect(() => {
    if (props.isClose !== isClose) {
      setClose(props.isClose);
    }
  }, [props.isClose, isClose]);

  const sidebarRef:
    | RefObject<HTMLDivElement | null>
    | Ref<HTMLDivElement | null> = useRef(null);
  useClickOutside(sidebarRef, props.handleClose);

  const classes = [
    "terkui-sidebar",
    ...(!isClose ? [`terkui-sidebar-size-${props.size}`] : ["terkui-sidebar-w-0"]),
    `terkui-sidebar-theme-${props.themeMode}`,
  ];

  return (
    <Transition in={isClose} timeout={props.timeout || 150} nodeRef={sidebarRef}>
      {(state, childProps) => {
        const children = props?.renderChildren
          ? props.renderChildren({
              style: {
                ...transitionStyles[state],
              },
              classes,
              ref: sidebarRef,
              ...childProps,
            })
          : null;
        return children;
      }}
    </Transition>
  );
};

export default Sidebar;
