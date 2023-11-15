import Share from './share';
import { useState } from 'react';
const meta = {
  title: 'Example/Share',
  component: Share,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
const Default = {
  args: {
    foldername:"data science"
  },
};

export { Default };
