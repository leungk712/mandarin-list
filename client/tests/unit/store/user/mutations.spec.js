import { userMutations } from "@/store/modules/user";
import { mockUser } from "../../mocks/mock-user";

const {
    addToLoadingState,
    removeFromLoadingState,
    setAvatarColor,
    setLoginSuccess,
    setLogout,
    setUser
} = userMutations;

describe("user.ts", () => {
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
    it("setAvatarColor", () => {
        const state = { avatarColor: "" };
        setAvatarColor(state, "#eeeeee");
        expect(state.avatarColor).toEqual("#eeeeee");
    });
    it("setLoginSuccess", () => {
        const mockResp = { token: "ekgglhjr048506ffo" };
        const state = { accessToken: "", isLoggedIn: false };
        setLoginSuccess(state, mockResp);
        expect(state.accessToken).toEqual(`Bearer ${mockResp.token}`);
        expect(state.isLoggedIn).toEqual(true);
    });
    it("setLogout", () => {
        const state = {
            accessToken: "Bearer ekgglhjr048506ffo",
            avatarColor: "#eeeeee",
            user: mockUser,
            isLoggedIn: true
        };
        setLogout(state);
        expect(state.accessToken).toEqual("");
        expect(state.avatarColor).toEqual("");
        expect(state.user).toEqual(null);
        expect(state.isLoggedIn).toEqual(false);
    });
    it("setUser", () => {
        const state = { user: null };
        setUser(state, mockUser);
        expect(state.user).toEqual(mockUser);
    });
});
