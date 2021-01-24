import { extendTheme } from "@chakra-ui/react";

const edits = {
  fonts: {
    body: `Inter,-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol"`,
  },
  fontweights: {
    normal: 400,
    medium: 600,
    bold: 800,
  },
};

export const theme = extendTheme(edits);
