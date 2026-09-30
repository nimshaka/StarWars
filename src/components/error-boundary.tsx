import { Component, type ErrorInfo, type ReactNode } from "react";

import { ErrorState } from "@/components/states";

interface Props {
  readonly children: ReactNode;
}

interface State {
  error: Error | null;
}

/**
 * Catches render-time crashes so a broken subtree shows a recoverable panel
 * instead of a blank page. React Query errors are handled per-query.
 */
export class ErrorBoundary extends Component<Props, State> {
  state: State = { error: null };

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("Unhandled render error:", error, info.componentStack);
  }

  private readonly reset = () => {
    this.setState({ error: null });
  };

  render() {
    const { error } = this.state;

    if (error) {
      return (
        <div className="mx-auto max-w-2xl px-4 py-16">
          <ErrorState
            message="The interface hit an unexpected error. Reloading usually clears it."
            onRetry={this.reset}
          />
        </div>
      );
    }

    return this.props.children;
  }
}
