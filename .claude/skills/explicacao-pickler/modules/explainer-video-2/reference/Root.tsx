import React from 'react';
import {Composition} from 'remotion';
import {AgentExplainer} from './Video';

export const Root: React.FC = () => (
  <Composition id="AgentExplainer" component={AgentExplainer} durationInFrames={1200} fps={30} width={1920} height={1080} />
);
