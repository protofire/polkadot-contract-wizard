import { Theme, useMediaQuery } from "@mui/material";

export function useMatchDownSM() {
  return useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));
}