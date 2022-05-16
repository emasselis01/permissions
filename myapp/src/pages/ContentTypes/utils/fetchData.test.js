import {readData} from "./fetchData";

it("test data", () => {
  const resultData1 = readData;

  console.log("adwadsdgasc", resultData1())

  expect(resultData1).toBeTruthy()
})
