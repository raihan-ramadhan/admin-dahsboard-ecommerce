import { createSlice } from "@reduxjs/toolkit";
import { AppDispatch } from "store";

type Mode = "dark" | "light";

interface InitialState {
  mode: Mode;
  userId: string;
}

const storageTheme = localStorage.getItem("mode") as Mode | null;
const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
  ? "dark"
  : "light";
const defaultTheme = "dark";

const initialState: InitialState = {
  mode: storageTheme || systemTheme || defaultTheme,
  userId: "63701cc1f03239b7f700000d",
};

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
  },
});

export const { setMode } = globalSlice.actions;

export const asyncToggleTheme = () => (dispatch: AppDispatch) => {
  const newMode: Mode =
    storageTheme === "dark"
      ? "light"
      : storageTheme === "light"
      ? "dark"
      : defaultTheme;

  localStorage.setItem("mode", newMode);
  dispatch(setMode());
};

export default globalSlice.reducer;
