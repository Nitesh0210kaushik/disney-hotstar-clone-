import { fireEvent, render } from "@testing-library/react-native";

import { StateCard } from "@/components/StateCard";
import { ThemeProvider } from "@/context/theme-context";

describe("StateCard", () => {
  it("renders copy and calls the action", async () => {
    const onAction = jest.fn();

    const { getByText } = await render(
      <ThemeProvider>
        <StateCard
          title="Nothing saved yet"
          body="Add titles from Home to keep them here."
          actionTitle="Retry"
          onAction={onAction}
        />
      </ThemeProvider>
    );

    expect(getByText("Nothing saved yet")).toBeTruthy();
    expect(getByText("Add titles from Home to keep them here.")).toBeTruthy();

    fireEvent.press(getByText("Retry"));

    expect(onAction).toHaveBeenCalledTimes(1);
  });
});
