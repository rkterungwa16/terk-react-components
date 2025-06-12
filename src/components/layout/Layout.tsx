import { FC, ReactNode, Ref, RefObject, useState } from "react";
import { Container } from "../container/Container";
import Sidebar from "../sidebar/Sidebar";
import { sidebarTheme } from "../sidebar/theme";
import classnames from "classnames";

import "./style.css";
import { sizes } from "../sidebar/constants";

export interface ILayout {
  children?: ReactNode;
  toggleSidebar?: () => void;
}
export const Layout: FC<ILayout> = ({ children }) => {
  const [isClose, setClose] = useState(false);
  const handleToggleSidebar = () => {
    setClose(!isClose);
  };
  return (
    <div
      // className="terkui-layout-wrapper"
      className="wrapper"
      // style={{
      //   display: "flex",
      //   width: "100%",
      //   overflow: "hidden",
      // }}
    >
      <Sidebar
        width={350}
        theme={sidebarTheme}
        themeMode="dark"
        size="xl"
        isClose={isClose}
        // handleClose={handleToggleSidebar}
        renderChildren={(props: {
          ref?: RefObject<HTMLDivElement | null> | Ref<HTMLDivElement | null>;
          // style: HTMLAttributes<HTMLDivElement>;
          style: {
            opacity: number;
            transform?: string;
          };
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
                 */
                padding: "0.5rem",
              }}
              ref={props.ref}
            >
              <p className="terkui-py-3">Monday</p>
              <p>Tuesday</p>
              <p>Wednesday</p>
              <p>Thursday</p>
              <p>Friday</p>
            </div>
          );
        }}
      />
      <main
        className="content"
        style={{
          ...(isClose
            ? { marginLeft: "0rem" }
            : { marginLeft: `${sizes["xl"]}rem` }),
        }}
      >
        <div className="terkui-flex terkui-flex-column terkui-min-vh-100">
          {/* <AppHeader /> */}
          <div className="terkui-flex-grow-1 px-3">
            <button onClick={handleToggleSidebar}>Toogle sidebar</button>
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
