import React from "react";
import { Story } from "inkjs";

const CLEAN_SCREEN_TAG = "@cleanScreen\n";

type InkAction = {
  type: "INITIALIZE_STORY" | "CONTINUE";
  payload?: any;
};

type InkContent = {
  data: string | null;
  key: number;
};

type InkState = {
  contents: InkContent[];
  story?: InstanceType<typeof Story>;
};

const useInk = (storyFile: string) => {
  const initialState: InkState = React.useMemo(
    () => ({
      contents: [],
      story: undefined,
    }),
    []
  );

  const getNextContent = React.useCallback(
    (storyObject: InstanceType<typeof Story>) => {
      const result: { data: InkContent[]; newScreen: boolean } = {
        data: [],
        newScreen: false,
      };
      while (storyObject?.canContinue) {
        const nextParagraph = storyObject.Continue();
        if (nextParagraph === CLEAN_SCREEN_TAG) {
          result.newScreen = true;
          continue;
        } else {
          result.data.push({
            data: nextParagraph,
            key: Date.now(),
          });
        }
      }
      return result;
    },
    []
  );

  const [state, dispatch] = React.useReducer(
    (previousState: InkState, action: InkAction) => {
      let inkStory, content;
      switch (action.type) {
        case "CONTINUE":
          content = action.payload.newScreen ? [] : previousState.contents;
          return {
            ...previousState,
            contents: [...content, ...action.payload.data] as InkContent[],
          };
        case "INITIALIZE_STORY":
          inkStory = new Story(action.payload as string);
          content = getNextContent(inkStory);
          return {
            contents: [...content.data],
            story: inkStory,
          };
        default:
          return previousState;
      }
    },
    initialState
  );

  const handleInitialize = React.useCallback(async (storyFile: string) => {
    const storyData = await fetch(storyFile);
    const storyText = await storyData.text();
    dispatch({
      type: "INITIALIZE_STORY",
      payload: storyText,
    });
  }, []);

  const handleContinue = React.useCallback(() => {
    if (state.story?.canContinue) {
      const nextContent = getNextContent(state.story);
      dispatch({
        type: "CONTINUE",
        payload: nextContent,
      });
    }
  }, [state.story, getNextContent]);

  React.useEffect(() => {
    handleInitialize(storyFile);
  }, [handleInitialize, storyFile]);

  return {
    ...state,
    globalTags: state.story?.globalTags ?? [],
    continue: handleContinue,
  };
};

export default useInk;
