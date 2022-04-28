import {Divider, Icon, Input, Layout} from '@ui-kitten/components';
import React from 'react';
import {ImageProps} from 'react-native';

const Search = (props?: Partial<ImageProps>) => (
  <Icon {...props} name="search-outline" />
);

type Props = {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
};

const ListHeaderComponent: React.FC<Props> = ({value, setValue}) => {
  return (
    <>
      <Layout style={{padding: 16}} level="3">
        <Input
          value={value}
          onChangeText={setValue}
          accessoryLeft={Search}
          selectTextOnFocus
          placeholder="Искать..."
        />
      </Layout>
      <Divider />
    </>
  );
};

export default ListHeaderComponent;
