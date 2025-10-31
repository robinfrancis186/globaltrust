import React from 'react';

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error | null;
}

export default class ErrorBoundary extends React.Component<React.PropsWithChildren, ErrorBoundaryState> {
  constructor(props: React.PropsWithChildren) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // eslint-disable-next-line no-console
    console.error('ErrorBoundary caught an error', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '2rem' }}>
          <h1 style={{ fontWeight: 800, fontSize: '1.5rem' }}>Something went wrong.</h1>
          <p style={{ marginTop: '0.5rem' }}>{this.state.error?.message}</p>
          <p style={{ marginTop: '0.5rem', color: '#666' }}>Check the browser console for a stack trace.</p>
        </div>
      );
    }
    return this.props.children;
  }
}


