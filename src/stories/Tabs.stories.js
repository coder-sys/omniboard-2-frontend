import Tabs from './Tabs';

export default {
  title: 'Example/Tabs',
  component: Tabs,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    backgroundColor: { control: 'color' },
  },
};

export const Default = (args) => <Tabs {...args} />;
Default.args = {};

// If you need to define metadata like tags or autodocs, you can do so in the "parameters" object.
Default.parameters = {
  tags: ['autodocs'],
};
