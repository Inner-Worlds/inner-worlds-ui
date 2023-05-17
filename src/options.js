import chroma from "chroma-js";
import { mockEmotions, mockTags } from './mock-data'

export const generateColor = () => chroma.random().css();

export const getEmotionOptions = () =>
  mockEmotions.data.emotions.map((emotion) => ({
    value: emotion,
    label: emotion,
    color: generateColor(),
  }));

export const getTagOptions = () =>
  mockTags.data.tags.map((tag) => ({
    value: tag,
    label: tag,
    color: generateColor(),
  }));

export const colourStyles = {
  control: (styles) => ({ ...styles, backgroundColor: "white" }),
  option: (styles, { data, isDisabled, isFocused, isSelected }) => {
    const color = data.color;
    return {
      ...styles,
      backgroundColor: isDisabled
        ? null
        : isSelected
        ? color
        : isFocused
        ? chroma(color).alpha(0.1).css()
        : null,
      color: isDisabled
        ? "#ccc"
        : isSelected
        ? chroma.contrast(color, "white") > 2
          ? "white"
          : "black"
        : color,
      cursor: isDisabled ? "not-allowed" : "default",
    };
  },
  multiValue: (styles, { data }) => {
    const color = data.color;
    return {
      ...styles,
      backgroundColor: color,
    };
  },
  multiValueLabel: (styles, { data }) => ({
    ...styles,
    color: "white",
  }),
  multiValueRemove: (styles, { data }) => ({
    ...styles,
    color: "white",
    ":hover": {
      backgroundColor: data.color,
      color: "white",
    },
  }),
};
