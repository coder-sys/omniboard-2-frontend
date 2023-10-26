import CustomizedInputsStyleOverrides from './TextField';

export default {
  title: 'Example/CustomizedInputsStyleOverrides',
  component: CustomizedInputsStyleOverrides,
  parameters: {
    layout: 'centered',
  },
  args: {
    text: 'test',
  },
  parameters: {
    tags: ['autodocs'],
  },
};

export const Default = (args) => <CustomizedInputsStyleOverrides {...args} />;
