import { List, Divider } from 'antd';

export const GenreList = ({ items, displayTitle }) => {
  // should be a comma-separated list of strings
  return (
    <>
      <Divider orientation="left">{displayTitle}</Divider>
      <List
        header={<div>!!Header!!</div>}
        bordered
        dataSource={items}
        renderItem={(item) => <List.Item>{item}</List.Item>}
      />
    </>
  );
};
