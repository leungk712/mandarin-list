import { snackbarMutations } from "@/store/modules/snackbar";

const {
    displaySnackbar,
    setMessage,
    setType,
    resetSnackbarState
} = snackbarMutations;

describe("snackbar.ts", () => {
    it("displaySnackbar", () => {
        const state = { display: false };
        displaySnackbar(state);
        expect(state.display).toEqual(true);
    });
    it("setMessage", () => {
        const state = { message: "" };
        setMessage(state, "this is an snackbar message!");
        expect(state.message).toEqual("this is an snackbar message!");
    });
    it("setType", () => {
        const state = { type: "" };
        setType(state, "error");
        expect(state.type).toEqual("error");
    });
    it("resetSnackbarState", () => {
        const state = {
            display: true,
            message: "showing snackbar message",
            type: "error"
        };
        resetSnackbarState(state);
        expect(state.display).toEqual(false);
        expect(state.message).toEqual("");
        expect(state.type).toEqual("");
    });
});
