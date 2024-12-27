import React from "react";
import Box from "@mui/material/Box";
import MuiContainer from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import { styled, useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { motion } from "framer-motion";
import { Story } from "inkjs";
import AppBar from "../AppBar";
import DiceResult from "../DiceResult";
import Option, { IOption } from "../Option";
import SideBar from "../SideBar";
import useInk from "./useInk";

type Enumerate<
  N extends number,
  Acc extends number[] = [],
> = Acc["length"] extends N
  ? Acc[number]
  : Enumerate<N, [...Acc, Acc["length"]]>;

type IntRange<F extends number, T extends number> = Exclude<
  Enumerate<T>,
  Enumerate<F>
>;

const Main = styled("main")(() => ({
  display: "flex",
  flexDirection: "column",
  height: "100%",
}));

const Container = styled(MuiContainer)(() => ({
  display: "flex",
  flexDirection: "row",
  flexGrow: 1,
  padding: "0 !important",
  // [theme.breakpoints.up("md")]: {
  //   borderLeft: "1px solid " + theme.palette.divider,
  //   borderRight: "1px solid " + theme.palette.divider,
  // },
}));

export interface IStoryProvider {
  story: string;
  enableSideBar?: boolean;
}

export const StoryContext = React.createContext<
  InstanceType<typeof Story> | object
>({});

const StoryProvider: React.FC<IStoryProvider> = (props) => {
  const { enableSideBar, story: storyFile } = props;
  const theme = useTheme();

  // FIXME - define correct type
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const scrollableRef: any = React.useRef();

  const ink = useInk(storyFile);

  const [currentView, setView] = React.useState(0);
  const [skillCheck, setSkillCheck] = React.useState<{
    attribute: string;
    difficulty: IntRange<0, 100>;
    failureKnot: string;
    id: number;
    successKnot: string;
  }>();

  const printOptions = () => {
    return (
      <Stack direction="column" spacing={1} sx={{ marginTop: 8 }}>
        {ink.story?.canContinue ? (
          <Option onClick={() => ink.continue()} variant="default">
            ...
          </Option>
        ) : (
          <>
            {// FIXME - define correct type
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            ink.story?.currentChoices.map((element: any, index: number) => {
              const attribute = element.tags[0]?.match(/(.*)\((\d*)\)/);

              let variant = "default";
              if (attribute) {
                variant = "election";
              } else if (element.tags[0] === "highlight") {
                variant = "highlight";
              }

              return (
                <Option
                  key={`option-${index}`}
                  attribute={attribute?.[1] as IOption["attribute"]}
                  difficulty={Number(attribute?.[2])}
                  onClick={() => {
                    if (attribute?.[1]) {
                      setSkillCheck(() => ({
                        attribute: attribute[1],
                        difficulty: attribute[2],
                        failureKnot: element.tags[2],
                        id: index,
                        successKnot: element.tags[1],
                      }));
                    } else {
                      ink.story?.ChooseChoiceIndex(index);
                      ink.continue();
                    }
                  }}
                  variant={variant as "election"}>
                  {element.text}
                </Option>
              );
            })}
          </>
        )}
      </Stack>
    );
  };

  React.useEffect(() => {
    if (scrollableRef.current) {
      scrollableRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "nearest",
      });
    }
  }, [ink.contents]);

  const renderContents = () => {
    switch (currentView) {
      case 1:
        return (
          <motion.div
            key={`mapa`}
            ref={scrollableRef}
            animate={{ opacity: 1, scale: 1 }}
            initial={{ opacity: 0, scale: 1 }}
            transition={{ duration: 1 }}>
            <Typography>Mapa.</Typography>
          </motion.div>
        );
      case 2:
        return (
          <motion.div
            key={`tareas`}
            ref={scrollableRef}
            animate={{ opacity: 1, scale: 1 }}
            initial={{ opacity: 0, scale: 1 }}
            transition={{ duration: 1 }}>
            <Typography>Tareas y objetivos.</Typography>
          </motion.div>
        );
      case 4:
        return (
          <motion.div
            key={`configuración`}
            ref={scrollableRef}
            animate={{ opacity: 1, scale: 1 }}
            initial={{ opacity: 0, scale: 1 }}
            transition={{ duration: 1 }}>
            <Typography>Configuración.</Typography>
          </motion.div>
        );
      default:
        return (
          <>
            <Box
              sx={{
                display: "flex",
                flexGrow: 1,
                flexDirection: "column",
              }}>
              {ink.contents.map((element, index) => (
                <motion.div
                  key={`content-${index}-${element.key}`}
                  ref={scrollableRef}
                  animate={{ opacity: 1, scale: 1 }}
                  initial={{ opacity: 0, scale: 1 }}
                  transition={{ duration: 1 }}>
                  <Typography
                    sx={{
                      marginBottom: 3,
                      transition: (theme) =>
                        `color ${theme.transitions.duration.complex}`,
                    }}>
                    {element.data}
                  </Typography>
                </motion.div>
              ))}
            </Box>
            {printOptions()}
          </>
        );
    }
  };

  return (
    <StoryContext.Provider value={ink.story ?? {}}>
      <Main>
        <AppBar title={ink.globalTags[0] ?? ""} />

        <Container maxWidth="sm">
          <Box
            sx={{
              flexGrow: 1,
              display: "flex",
              flexDirection: "column",
              padding: 2,
              [theme.breakpoints.up("sm")]: {
                padding: 3,
              },
            }}>
            {renderContents()}
          </Box>
          {!enableSideBar ? null : (
            <SideBar onChange={setView} value={currentView} />
          )}
        </Container>
      </Main>

      <DiceResult
        difficulty={skillCheck?.difficulty}
        onAccept={(isSuccess) => {
          const temp = skillCheck;
          setSkillCheck(undefined);
          ink.story?.ChooseChoiceIndex(temp?.id as number);
          ink.story?.ChoosePathString(
            isSuccess
              ? (temp?.successKnot as string)
              : (temp?.failureKnot as string)
          );
          ink.continue();
        }}
        open={Boolean(skillCheck?.difficulty)}
      />
    </StoryContext.Provider>
  );
};

export default StoryProvider;
