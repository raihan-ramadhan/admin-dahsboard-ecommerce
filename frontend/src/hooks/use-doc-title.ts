import { useEffect } from "react";

export const useDocTitle = (title: string) => {
  useEffect(() => {
    document.title = title;
    return () => {
      document.title = "Admin Dashboard";
    };
  }, [title]);
};
