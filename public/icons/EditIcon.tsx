import React from "react";

interface EditIconProps {
  width?: string;
  height?: string;
  fill?: string;
}

const EditIcon: React.FC<EditIconProps> = ({
  width = 24,
  height = 24,
  fill = "black",
}) => {
  return (
    <svg
      viewBox="-1 7.9998 18.0002 18.0002"
      width={width}
      height={height}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill={fill}
        d="M 14.707 8.293 C 14.316 7.902 13.684 7.902 13.293 8.293 L 12 9.586 C 12 9.642 15.414 13.033 15.414 13 L 16.707 11.707 C 17.098 11.316 17.098 10.684 16.707 10.293 L 14.707 8.293 Z M -1 22.586 L -1 26 L 2.414 26 L 14.707 13.707 L 11.293 10.293 L -1 22.586 Z"
        transform="matrix(1, 0, 0, 1, 3.552713678800501e-15, 0)"
      />
    </svg>
  );
};

export default EditIcon;
