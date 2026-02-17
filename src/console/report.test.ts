import { describe, expect, it, vi } from "vitest";

import { storeData } from "../data/mockData.js";
import { printReport } from "./report.js";

describe("printReport", () => {
  it("matches the golden output", () => {
    const logs: string[] = [];
    const logSpy = vi.spyOn(console, "log").mockImplementation((...args) => {
      logs.push(args.join(" "));
    });

    printReport(storeData);

    logSpy.mockRestore();

    expect(logs.join("\n")).toMatchSnapshot();
  });
});
