export interface headerProps {
  type: 'header';
  isLogin: boolean;
}
export interface searchHeaderProps {
  type: 'searchHeader';
  isLogin: boolean;
  setIsLogin: React.Dispatch<React.SetStateAction<boolean>>;
  onSubmit: React.MouseEventHandler<HTMLButtonElement>;
  onSearchWordChange: React.ChangeEventHandler<HTMLInputElement>;
  searchWord: string;
}
