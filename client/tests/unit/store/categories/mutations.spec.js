import { categoriesMutations } from "@/store/modules/categories";

const {
  addToLoadingState,
  removeFromLoadingState
} = categoriesMutations;

describe("categories.ts", () => {
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
});
