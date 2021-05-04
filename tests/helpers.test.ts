import {arrayHas} from "../src/scripts/helpers";

interface IItem {
    params1: string,
    params2: string,
}

describe('Test helpers', () => {
    test("arrayHas should return true for objects", () => {

        const items: Array<IItem> = [
            {params1: "params 1", params2: "params 1"},
            {params1: "params 2", params2: "params 2"}
        ]
        expect(arrayHas<IItem>(items, items[0])).toBeTruthy();
    });
});
