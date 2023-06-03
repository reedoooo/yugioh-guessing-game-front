import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  colors: {
    brand: {
      50: "#f2f6ff",
      100: "#c5d4e9",
      200: "#98b3d4",
      300: "#6a91be",
      400: "#3d70a9",
      500: "#114f93",
      600: "#0d3d74",
      700: "#0a2b55",
      800: "#061936",
      900: "#030617",
    },
    secondary: {
      50: "#f9f9fb",
      100: "#e4e7f0",
      200: "#cad0dd",
      300: "#afbac9",
      400: "#95a4b7",
      500: "#7a8fa5",
      600: "#62738c",
      700: "#495670",
      800: "#313a55",
      900: "#181f3b",
    },
  },
  components: {
    Button: {
      baseStyle: {
        fontWeight: "bold",
        borderRadius: "md",
      },
      variants: {
        brand: {
          bg: "brand.500",
          color: "white",
          _hover: {
            bg: "brand.600",
          },
        },
        secondary: {
          bg: "secondary.500",
          color: "white",
          _hover: {
            bg: "secondary.600",
          },
        },
      },
    },
    Heading: {
      baseStyle: {
        fontWeight: "bold",
      },
    },
    ListItem: {
      baseStyle: {
        cursor: "pointer",
      },
    },
  },
});

export default theme;
