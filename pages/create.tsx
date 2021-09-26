import Root from "../components/Root";
import { Box, Flex } from "@theme-ui/components";
import { ChaosSketch } from "../components/ChaosSketch";
import SketchEditor from "../components/SketchEditor";
import { testScript } from "../utils/constants/testSketch";
import { useState } from "react";
import { SX } from "../styles/theme";

export default function Create() {
  const [sketchCode, setSketchCode] = useState(testScript);

  return (
    <Root>
      <Flex sx={sx.createContainer}>
        <Box>
          <ChaosSketch sketchCode={sketchCode} />
        </Box>
        <Box>
          <SketchEditor onCodeRun={(c) => setSketchCode(c)} />
        </Box>
      </Flex>
    </Root>
  );
}

const sx: SX = {
  createContainer: {
    height: "100%",
    alignItems: "center",
    justifyContent: "space-around",
  },
};
