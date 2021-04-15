import { storyMutations } from "@/store/modules/stories";
import { mockStories } from "../../mocks/mock-stories";

const {
  addToLoadingState,
  removeFromLoadingState,
  resetStoriesState,
  setStoriesList
} = storyMutations;

describe("stories.ts", () => {
  it("addToLoadingState", () => {
    const state = { loadingState: [] };
    addToLoadingState(state, "load state");
    expect(state.loadingState).toEqual(["load state"]);
  });
  it("removeFromLoadingState", () => {
    const state = { loadingState: ["load state"] };
    removeFromLoadingState(state, "load state");
    expect(state.loadingState).toEqual([]);
  });
  it("resetStoriesState", () => {
    const state = {
        storiesList: mockStories,
        loadingState: [],
        selectedStory: mockStories[1]
    };
    resetStoriesState(state);
    expect(state.storiesList).toEqual([]);
    expect(state.loadingState).toEqual([]);
    expect(state.selectedStory).toEqual(null);
  });
  it("setStoriesList", () => {
    const state = {
        storiesList: []
    };
    setStoriesList(state, mockStories);
    expect(state.storiesList).toEqual(mockStories);
  });
});
