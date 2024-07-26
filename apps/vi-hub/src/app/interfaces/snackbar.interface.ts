export type snackInfo = {
  icon?: string;
  bar?: string;
  action?: string;
  container?: string;
  content?: string;
};

export interface SnackbarData {
  type: SnackbarType;
  text: string;
  info?: snackInfo;
  action?: {
    title: string;
  };
}
export enum SnackbarType {
  ERROR,
  WARN,
  INFO,
  SUCCESS,
}
