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
import { sidebarSizes, timeouts } from "../../utils/constants";
import { Overlay } from "../overlay/Overlay";

interface ISidebar {
  isClose: boolean;
  timeout?: 150 | 200 | 250 | 300 | 350 | 400;
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
  mainContainerRef: RefObject<HTMLDivElement | HTMLElement | null>;
  sidebarContainerRef?: RefObject<HTMLDivElement | HTMLElement | null>;
  handleClose?: (close: boolean) => () => void;
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
  const [mobile, setMobile] = useState(true);
  const sidebarContainerRef:
    | RefObject<HTMLDivElement | null>
    | Ref<HTMLDivElement | null> = useRef(null);
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
      setMobile(true);
    } else {
      setMobile(false);
    }
  }, [breakpoint, mobile]);

  useEffect(() => {
    if (props?.mainContainerRef && props.mainContainerRef?.current) {
      if (mobile) {
        props.mainContainerRef.current.style.marginLeft = "0rem";
      } else if (!mobile) {
        props.mainContainerRef.current.style.marginLeft = isClose
          ? "0rem"
          : `${sidebarSizes["xl"]}rem`;
      }
    }
  }, [props, props.mainContainerRef, mobile, isClose]);

  /**
   * If screen size is a tab (md) close the fixed-width side bar. But user can open sidebar with overlay
   */
  useEffect(() => {
    setClose(props.isClose);
  }, [props.isClose, props]);

  useClickOutside({
    sidebarContainerRef,
    action: props.handleClose?.(isClose),
    mainContainerRef: props.mainContainerRef,
  });

  const classes = [
    "terkui-sidebar",
    // ...(!isClose ? [`terkui-sidebar-size-${props.size}`] : ["terkui-sidebar-w-0"]),
    `terkui-sidebar-size-${props.size}`,
    `terkui-sidebar-theme-${props.themeMode}`,
    `terkui-transition-ease-${timeouts[props.timeout || 150]}`,
  ];

  const renderSidebarOverlay = () => {
    if (mobile) {
      return (
        <Overlay
          visible={isClose ? false : true}
          animation="fadein"
          timeout={props.timeout}
        />
      );
    }
    return null;
  };

  return (
    <>
      <Transition
        in={isClose}
        timeout={props.timeout || 150}
        nodeRef={sidebarContainerRef}
      >
        {(state, childProps) => {
          const children = props?.renderChildren
            ? props.renderChildren({
                style: {
                  ...transitionStyles[state],
                },
                classes,
                ref: sidebarContainerRef,
                ...childProps,
                isClose,
              })
            : null;
          return children;
        }}
      </Transition>
      {renderSidebarOverlay()}
    </>
  );
};

export default Sidebar;
