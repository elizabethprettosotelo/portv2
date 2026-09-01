"use client";

import MuiTooltip from "@mui/material/Tooltip";
import type { ReactNode } from "react";
import type { TooltipProps as MuiTooltipProps } from "@mui/material/Tooltip";

type TooltipProps = {
  children: ReactNode;
  label: string;
  followCursor?: boolean;
  className?: string;
  placement?: MuiTooltipProps["placement"];
};

export default function Tooltip({
  children,
  label,
  followCursor = false,
  className = "",
  placement = "top",
}: TooltipProps) {
  return (
    <MuiTooltip
      arrow
      followCursor={followCursor}
      title={label}
      placement={placement}
      disableInteractive
      enterDelay={120}
      slotProps={{
        popper: {
          modifiers: [
            {
              name: "offset",
              options: {
                offset: [0, 10],
              },
            },
          ],
        },
        tooltip: {
          sx: {
            bgcolor: "#250D47",
            color: "#9AB1EB",
            border: "1px solid rgba(154, 177, 235, 0.35)",
            fontFamily: "monospace",
            fontSize: "0.65rem",
            fontWeight: 700,
            letterSpacing: "0.24em",
            textTransform: "uppercase",
            px: 1.5,
            py: 0.75,
          },
        },
        arrow: {
          sx: {
            color: "#250D47",
            "&::before": {
              border: "1px solid rgba(154, 177, 235, 0.55)",
            },
          },
        },
      }}
    >
      <span className={className}>{children}</span>
    </MuiTooltip>
  );
}
