import {
  FC,
  ReactElement,
  RefObject,
  useEffect,
  useRef,
  useState,
} from "react";
import { Transition } from "react-transition-group";
import { sidebarTheme } from "./theme";
import { useClickOutside } from "../../hooks/useClickOutside";
import { IDefaultStyle, ITransitionStyle } from "./types";

interface ISidebar {
  isClose: boolean;
  timeout: number;
  theme: {
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
  themeMode: "dark" | "light";
  width: number;
  className?: string;
  handleClose?: () => void;
  renderChildren?: ({
    ref,
    style,
    props,
  }: {
    ref?: RefObject<HTMLElement | null>;
    style: IDefaultStyle;
    props?: Record<string, unknown>;
  }) => ReactElement;
}
const Sidebar: FC<ISidebar> = (
  props = {
    isClose: false,
    timeout: 150,
    theme: sidebarTheme,
    width: 350,
    themeMode: "dark",
  }
) => {
  const [isClose, setClose] = useState(props.isClose);
  const defaultStyle: IDefaultStyle = {
    position: "fixed",
    top: "0",
    left: "0",
    bottom: "0",
    zIndex: 1030,
    order: -1,
    opacity: 1,
    display: "flex",
    flex: `0 0 ${props.width}px`,
    flexDirection: "column",
    width: `${props.width}px`,
    transition: ".3s ease-out",
    color: `${props.theme.sidebar[props.themeMode].color}`,
    backgroundColor: `${props.theme.sidebar[props.themeMode].backgroundColor}`,
  };

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

  const sidebarRef: RefObject<HTMLElement | null> = useRef(null);
  useClickOutside(sidebarRef, props.handleClose);
  return (
    <Transition in={isClose} timeout={props.timeout}>
      {(state, childProps) => {
        const children = props?.renderChildren
          ? props.renderChildren({
              style: {
                ...defaultStyle,
                ...transitionStyles[state],
              },
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
