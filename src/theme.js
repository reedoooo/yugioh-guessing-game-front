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
      50: "#f2eaff",
      100: "#d4b6ff",
      200: "#b488ff",
      300: "#9761ff",
      400: "#7a3dff",
      500: "#5d17ff",
      600: "#4d00cc",
      700: "#3d0099",
      800: "#2d0066",
      900: "#1e0033",
      neonPurple: "#aa00ff",
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
          _active: {
            bg: "brand.700",
          },
        },
        secondary: {
          bg: "secondary.500",
          color: "white",
          _hover: {
            bg: "secondary.600",
          },
          _active: {
            bg: "secondary.700",
          },
        },
      },
    },
    Heading: {
      baseStyle: {
        fontWeight: "bold",
        textTransform: "uppercase",
      },
      variants: {
        primary: {
          color: "brand.500",
        },
        secondary: {
          color: "secondary.500",
        },
      },
    },
    ListItem: {
      baseStyle: {
        cursor: "pointer",
        _hover: {
          bg: "gray.100",
        },
      },
    },
  },
  styles: {
    global: {
      body: {
        bg: "brand.50",
        color: "brand.900",
      },
    },
  },
});

export default theme;
