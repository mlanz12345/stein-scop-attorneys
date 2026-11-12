import React from 'react';
import { renderToString } from 'react-dom/server';
import { HelmetProvider } from 'react-helmet-async';
import App from './App';
export { allMembers as teamMembers } from './data/team';

export function render(url: string) {
  const helmetContext: { helmet?: any } = {};
  const html = renderToString(
    <HelmetProvider context={helmetContext}>
      <App url={url} />
    </HelmetProvider>
  );

  return {
    html,
    helmet: helmetContext.helmet,
  };
}
