import React from "react";
import { useTheme } from "@mui/material";

const Loading: React.FC = () => {
  const theme = useTheme();

  // i got the svg from https://codepen.io/raulaguilarv/pen/QrOPBG
  return (
    <React.Fragment>
      <style>
        {`
        @keyframes dash {
          0% {
            stroke-dasharray: 0 300;
            stroke-dashoffset: -150;
            opacity: 0.1;
          }
        
          50% {
            stroke-dasharray: 300 300;
            stroke-dashoffset: 0;
            opacity: 0.8;
          }
        
          100% {
            stroke-dasharray: 0 300;
            stroke-dashoffset: 0;
            opacity: 0.1;
          }
        }
      `}
      </style>
      <svg
        style={{
          width: "150px",
          height: "150px",
        }}
        viewBox="0 0 80 80"
      >
        <g
          stroke={theme.palette.secondary[300]}
          // transform="translate(13, 25)"
          strokeWidth="1.5"
        >
          <polyline
            strokeDasharray="42 300"
            strokeDashoffset="-150"
            fill="none"
            style={{
              animation: `dash 3s 0.2s linear infinite reverse`,
            }}
            points="0.747315209 24.6458138 7.44456625 29.6458138 14.1418173 10.6458138 20.8390683 15.6458138 27.5363194 17.6458138 34.2335704 25.6458138 38.9308215 2.6458138 46.6280725 15.6458138 50.8543411 10.4098828 54.3253236 0.645813797"
          />
        </g>
      </svg>
    </React.Fragment>
  );
};

export default Loading;
