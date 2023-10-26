import React from 'react';
import Sidebar from './sidebar';

export default {
  title: 'Example/Sidebar',
  component: Sidebar,
};

const Template = (args) => <Sidebar {...args} />;

export const Default = Template.bind({});
