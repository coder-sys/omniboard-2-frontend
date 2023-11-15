import WorkspaceCard from './WorkspaceCard';

const meta = {
  title: 'Example/WorkspaceCard',
  component: WorkspaceCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;

const Default = {
  args: {
    name: "Data Science",
    thumbnail: "https://i.ytimg.com/vi/RNwJbMovnVQ/hq720.jpg",
    description: "Data science is the study of data to extract meaningful insights for business. It is a multidisciplinary approach that combines principles and practices from the fields of mathematics, statistics, artificial intelligence, and computer engineering to analyze large amounts of data.",
  },
};

export { Default };
