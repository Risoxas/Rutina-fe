import {
  css,
  FlattenSimpleInterpolation,
  SimpleInterpolation,
} from "styled-components";

export const sizes: Record<string, number> = {
  mobile: 768,
  tablet: 1024,
};

type MediaFunction = (
  ...args: SimpleInterpolation[]
) => FlattenSimpleInterpolation;

const media: Record<string, MediaFunction> = Object.keys(sizes).reduce<
  Record<string, MediaFunction>
>((acc, label) => {
  acc[label] = (...args: SimpleInterpolation[]) => css`
    @media (max-width: ${sizes[label]}px) {
      ${css(...args)};
    }
  `;

  return acc;
}, {});

export default media;
