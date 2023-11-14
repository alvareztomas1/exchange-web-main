import init from "../web.js";
import "../index.js"

jest.mock('../web.js', () => jest.fn());

it("tests that web is being initialized", ()=>{
    expect(init).toHaveBeenCalledTimes(1);
});