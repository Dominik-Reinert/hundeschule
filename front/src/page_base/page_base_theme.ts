interface PageBaseThemefont {
  size: string;
  weight: string;
}

export interface PageBaseTheme {
  fonts: {
    headline: PageBaseThemefont;
    subHeadline: PageBaseThemefont;
    outline: PageBaseThemefont;
    normal: PageBaseThemefont;
    additionalInfo: PageBaseThemefont;
    button: PageBaseThemefont;
  };
  colors: {
    dark: string;
    normal: string;
    error: string;
  };
  notifications: {
    error: string;
    errorDark: string;
    info: string;
    infoDark: string;
    warning: string;
    warningDark: string;
  };
  grayscale: {
    dark: string;
    hoverOnDark: string;
    labelOnBackground: string;
    borderOnBackground: string;
    background: string;
    labelOnColor: string;
  };
  padding: string;
  borderRadius: string;
}

export const orangeTheme: PageBaseTheme = {
  fonts: {
    headline: {
      size: "24px",
      weight: "800",
    },
    subHeadline: {
      size: "20px",
      weight: "500",
    },
    outline: {
      size: "16px",
      weight: "500",
    },
    normal: {
      size: "16px",
      weight: "300",
    },
    additionalInfo: {
      size: "12px",
      weight: "300",
    },
    button: {
      size: "16px",
      weight: "800",
    },
  },
  colors: {
    dark: "#FE5800",
    normal: "#FF7300",
    error: "#ED4337",
  },
  notifications: {
    error: "#ffe2db",
    errorDark: "#ED4337",
    info: "#e5edff",
    infoDark: "#2598FF",
    warning: "#ffff82",
    warningDark: "#FFE165",
  },
  grayscale: {
    dark: "#444444",
    hoverOnDark: "#5f5f5f",
    labelOnBackground: "#606060",
    borderOnBackground: "#d8d8d8",
    labelOnColor: "#fafafa",
    background: "#f5f5f5",
  },
  padding: "8px",
  borderRadius: "8px",
};
