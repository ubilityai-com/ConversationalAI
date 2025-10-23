import React, { Component, ErrorInfo, ReactNode } from "react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class NodeErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Node Error Boundary caught an error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div className="w-64 bg-red-50 border-2 border-red-200 rounded-2xl p-4">
            <div className="text-red-600 text-sm font-medium">Node Error</div>
            <div className="text-red-500 text-xs mt-1">
              Something went wrong with this node
            </div>
          </div>
        )
      );
    }

    return this.props.children;
  }
}
