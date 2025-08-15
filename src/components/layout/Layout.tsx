import {
  FC,
  ReactNode,
  Ref,
  RefObject,
  useCallback,
  useRef,
  useState,
} from "react";
import { Container } from "../container/Container";
import Sidebar from "../sidebar/Sidebar";
import { sidebarTheme } from "../sidebar/theme";
import classnames from "classnames";

import "./styles.css";
import { SidebarNav } from "../sidebar/SidebarNav";
import { navData } from "../sidebar/navData";
import { Header } from "../header/Header";
import { HeaderNav } from "../header/HeaderNav";
import { headerNavData } from "../header/header-nav.data";

export interface ILayout {
  children?: ReactNode;
  toggleSidebar?: () => void;
}
export const Layout: FC<ILayout> = ({ children }) => {
  const [isClose, setClose] = useState(false);
  const containerRef = useRef<HTMLDivElement | HTMLElement | null>(null);
  const handleToggleSidebar = useCallback((close: boolean) => {
    return () => {
      setClose(!close);
    };
  }, []);

  const handleOnclick = useCallback((close: boolean) => {
    return () => {
      setClose(!close);
    };
  }, []);

  return (
    <div className="wrapper">
      <Sidebar
        width={350}
        theme={sidebarTheme}
        themeMode="dark"
        size="xl"
        isClose={isClose}
        handleClose={handleToggleSidebar}
        mainContainerRef={containerRef}
        renderChildren={(props: {
          ref?: RefObject<HTMLDivElement | null> | Ref<HTMLDivElement | null>;
          // style: HTMLAttributes<HTMLDivElement>;
          style: {
            opacity: number;
            transform?: string;
          };
          isClose?: boolean;
          props?: Record<string, unknown>;
          classes?: string[];
        }) => {
          return (
            <div
              className={classnames(props.classes || [""])}
              style={{
                ...props.style,
                height: "100vh",
                overflowX: "hidden",
                overflowY: "auto",
                /**
                 * if an element has a specified width,
                 * the padding added to that element will be added to the total width of the element.
                 * You will see the effect of this as the sidebar extends into the main content area.
                 * This behaviour occurs for the css property box-sizing: content-box;
                 * https://developer.mozilla.org/en-US/docs/Web/CSS/box-sizing
                 */
                padding: "0.5rem",
              }}
              ref={props.ref}
            >
              <SidebarNav
                data={navData}
                components={{ nav: "ul", navItem: "li" }}
                ref={props.ref}
              />
              {/* <p className="terkui-py-3">Monday</p>
              <p>Tuesday</p>
              <p>Wednesday</p>
              <p>Thursday</p>
              <p>Friday</p> */}
            </div>
          );
        }}
      />
      <main ref={containerRef} className="content">
        <div className="terkui-flex terkui-flex-column terkui-min-vh-100">
          {/* <AppHeader /> */}
          <Header container={{ breakpoint: "fluid" }}>
            <HeaderNav
              data={headerNavData}
              components={{ nav: "nav", navItem: "span" }}
            ></HeaderNav>
          </Header>
          <div className="terkui-flex-grow-1 px-3">
            <button onClick={handleOnclick(isClose)}>Toogle sidebar</button>
            <Container breakpoint="lg">{children}</Container>
          </div>
          {/* <AppFooter /> */}
        </div>
      </main>

      {/* <AppAside /> */}
    </div>
  );
};

export default Layout;
