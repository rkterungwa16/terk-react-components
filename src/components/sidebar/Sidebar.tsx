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
import { useCurrentBreakpoint } from "../../hooks/useCurrentBreakpoint";
import { sizes } from "./constants";

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
  visible?: boolean;
  containerRef?: RefObject<HTMLDivElement | HTMLElement | null>;
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
    isClose?: boolean;
    props?: Record<string, unknown>;
    classes?: string[];
  }) => ReactElement;
}
const Sidebar: FC<ISidebar> = (props) => {
  const [isClose, setClose] = useState(props.isClose);
  const [visible, setVisible] = useState(true);
  const breakpoint = useCurrentBreakpoint();

  const transitionStyles: ITransitionStyle = {
    entering: {
      opacity: 1,
      transform: `translateX(-${props.width}px)`,
      // marginLeft: `-${props.width}px`,
    },
    entered: {
      opacity: 1,
      transform: `translateX(-${props.width}px)`,
      // marginLeft: `-${props.width}px`,
    },
    exiting: { opacity: 1 },
    exited: { opacity: 1 },
  };

  useEffect(() => {
    if (["sm", "md"].includes(breakpoint as string)) {
      setVisible(false);
    } else {
      setVisible(true);
    }
  }, [breakpoint, visible]);

  useEffect(() => {
    if (props?.containerRef && props.containerRef?.current) {
      props.containerRef.current.style = `${
        isClose ? "margin-left: 0rem;" : `margin-left: ${sizes["xl"]}rem`
      }`;
    }
  }, [props, props.containerRef, isClose]);

  /**
   * If screen size is a tab (md) close the fixed-width side bar. But user can open sidebar with overlay
   */
  useEffect(() => {
    if (visible) {
      setClose(props.isClose);
    }
    if (!visible) {
      setClose(true);
    }
  }, [isClose, props.isClose, visible, props]);

  const sidebarRef:
    | RefObject<HTMLDivElement | null>
    | Ref<HTMLDivElement | null> = useRef(null);

  useClickOutside(sidebarRef, props.handleClose);

  const classes = [
    "terkui-sidebar",
    // ...(!isClose ? [`terkui-sidebar-size-${props.size}`] : ["terkui-sidebar-w-0"]),
    `terkui-sidebar-size-${props.size}`,
    `terkui-sidebar-theme-${props.themeMode}`,
  ];

  return (
    <Transition
      in={isClose}
      timeout={props.timeout || 150}
      nodeRef={sidebarRef}
    >
      {(state, childProps) => {
        const children = props?.renderChildren
          ? props.renderChildren({
              style: {
                ...transitionStyles[state],
              },
              classes,
              ref: sidebarRef,
              ...childProps,
              isClose,
            })
          : null;
        return children;
      }}
    </Transition>
  );
};

export default Sidebar;
