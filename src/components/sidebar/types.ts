export interface IDefaultStyle {
  position: string;
  top: string;
  left: string;
  bottom: string;
  zIndex: number;
  order: number;
  display: string;
  flex: string;
  flexDirection: string;
  width: string;
  transition: string;
  color: string;
  backgroundColor: string;
  opacity: number;
  transform?: string;
}

export interface ITransitionStyle {
  [key: string]: {
    opacity: number;
    transform?: string;
  };
  entering: {
    opacity: number;
    transform: string;
  };
  entered: {
    opacity: number;
    transform: string;
  };
  exiting: {
    opacity: number;
  };
  exited: {
    opacity: number;
  };
}
