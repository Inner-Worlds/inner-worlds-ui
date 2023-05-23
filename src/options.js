import chroma from "chroma-js";

export const generateColor = () => chroma.random().css();

export const getEmotionOptions = (emotions) => 
  emotions.map((emotion) => ({
    value: emotion.name,
    label: emotion.name,
    color: generateColor(),
  }));
  

export const getTagOptions = (tags) => 
    tags.map((tag) => ({
      value: tag.name,
      label: tag.name,
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
