export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

export const hexToRgb = (hex: string): [number, number, number] => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

  return result
    ? [
        parseInt(result[1], 16),
        parseInt(result[2], 16),
        parseInt(result[3], 16),
      ]
    : [0, 0, 0];
};

export const interpolateColor = (color1: string, color2: string, t: number) => {
  const rgb1 = hexToRgb(color1);
  const rgb2 = hexToRgb(color2);

  const r = Math.round(lerp(rgb1[0], rgb2[0], t));
  const g = Math.round(lerp(rgb1[1], rgb2[1], t));
  const b = Math.round(lerp(rgb1[2], rgb2[2], t));

  return `rgb(${r}, ${g}, ${b})`;
};
