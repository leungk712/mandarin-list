import { postMutations } from "@/store/modules/posts";

const {
    addToLoadingState,
    removeFromLoadingState,
    resetSelectedMandarin,
    setMandarinList,
    setSelectedMandarin
} = postMutations;

describe("posts.ts", () => {
    it("addToLoadingState", () => {
        const state = { loadingState: [] };
        addToLoadingState(state, "load state");
        expect(state.loadingState).toEqual(["load state"]);
    });
});