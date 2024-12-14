import React from "react";
import Box from "@mui/material/Box";
import MuiContainer from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import { alpha, styled, useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { motion } from "framer-motion";
import { Story } from "inkjs";
import AppBar from "../AppBar";
import DiceResult from "../DiceResult";
import Option, { IOption } from "../Option";
import SideBar from "../SideBar";
import Skill from "../Skill";

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

const Container = styled(MuiContainer)(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  flexGrow: 1,
  padding: "0 !important",
  [theme.breakpoints.up("md")]: {
    borderLeft: "1px solid " + theme.palette.divider,
    borderRight: "1px solid " + theme.palette.divider,
  },
}));

export interface IStoryProvider {
  story: string;
}

export const StoryContext = React.createContext({});

const StoryProvider: React.FC<IStoryProvider> = (props) => {
  const { story: storyFile } = props;
  const theme = useTheme();

  // FIXME - define correct type
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const scrollableRef: any = React.useRef();

  const [contents, setContents] = React.useState<(string | null)[]>([]);
  const [currentView, setView] = React.useState(0);
  // const [diceResult, setDiceResult] = React.useState<number | undefined>();
  const [story, setStory] = React.useState<InstanceType<typeof Story>>();
  const [skillCheck, setSkillCheck] = React.useState<{
    attribute: Skill;
    difficulty: IntRange<0, 100>;
    failureKnot: string;
    id: number;
    successKnot: string;
  }>();

  const getNextContent = () => {
    const result: { data: (string | null)[]; newScreen: boolean } = {
      data: [],
      newScreen: false,
    };
    // while (story?.canContinue) {
    const nextParagraph = story.Continue();
    if (nextParagraph === "@cleanScreen\n") {
      result.newScreen = true;
      // continue;
    } else {
      result.data.push(nextParagraph);
    }
    // }
    return result;
  };

  const handleContinue = () => {
    if (story?.canContinue) {
      setContents((currentContents) => {
        const newContent = getNextContent();
        const previousContents = newContent.newScreen
          ? []
          : [...currentContents];
        return [...previousContents, ...newContent.data];
      });
    }
  };

  const printOptions = () => {
    return (
      <Stack direction="column" spacing={1} sx={{ marginTop: 8 }}>
        {story?.canContinue ? (
          <Option onClick={() => handleContinue()} variant="default">
            ...
          </Option>
        ) : (
          <>
            {// FIXME - define correct type
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            story?.currentChoices.map((element: any, index: number) => {
              const attribute = element.tags[0]?.match(/(.*)\((\d*)\)/);

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
                      story.ChooseChoiceIndex(index);
                      handleContinue();
                    }
                  }}
                  variant={element.variant as "election" | undefined}>
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
    const fetchStory = async () => {
      const storyData = await fetch(storyFile);
      const result = await storyData.text();
      const inkStory = new Story(result);
      setContents([inkStory.Continue()]);
      setStory(inkStory);
    };

    fetchStory();
  }, [storyFile]);

  React.useEffect(() => {
    if (scrollableRef.current) {
      scrollableRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "nearest",
      });
    }
  }, [contents]);

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
              {contents.map((element, index) => (
                <motion.div
                  key={`content-${index}`}
                  ref={scrollableRef}
                  animate={{ opacity: 1, scale: 1 }}
                  initial={{ opacity: 0, scale: 1 }}
                  transition={{ duration: 1 }}>
                  <Typography
                    sx={{
                      color: (theme) =>
                        index === contents.length - 1
                          ? theme.palette.text.primary
                          : alpha(theme.palette.text.primary, 0.2),
                      marginBottom: 3,
                      transition: (theme) =>
                        `color ${theme.transitions.duration.complex}`,
                    }}>
                    {element}
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
    <StoryContext.Provider value={story}>
      <Main>
        <AppBar />

        <Container maxWidth="md">
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
          <SideBar onChange={setView} value={currentView} />
        </Container>
      </Main>

      <DiceResult
        difficulty={skillCheck?.difficulty}
        onAccept={(isSuccess) => {
          const temp = skillCheck;
          setSkillCheck(undefined);
          story.ChooseChoiceIndex(temp?.id);

          story.ChoosePathString(
            isSuccess ? temp?.successKnot : temp?.failureKnot
          );
          const newContent = getNextContent();
          setContents((curr) => [...curr, ...newContent.data]);
        }}
        open={Boolean(skillCheck?.difficulty)}
      />
    </StoryContext.Provider>
  );
};

export default StoryProvider;
