import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {Layout, List, useTheme} from '@ui-kitten/components';
import React, {Fragment, useCallback, useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from '../../../../redux';
import {getRemainders} from '../../../../redux/actions/private/remaindersActions';
import {TradeSessionDetail} from '../../../../redux/types/private/trade.types';
import {PrivateStackNavigator} from '../../../../utils/navigation.types';
import FooterLoader from '../../../general/FooterLoader';
import ListItem from '../../../general/ListItem';
import Preloader from '../../../loaders/Preloader';
import ListHeaderComponent from './ListHeaderComponent';

type Props = {
  navigation: NativeStackNavigationProp<PrivateStackNavigator, 'AddProduct'>;
};

const AddProduct: React.FC<Props> = ({navigation}) => {
  const theme = useTheme();

  const dispatch = useAppDispatch();
  const currentGTochkaId = useAppSelector(
    state => state.main.tradePoint?.gTochkaId,
  );

  const remainders = useAppSelector(state => state.remainders);
  const details = useAppSelector(state => state.remainders.data.details);
  const loading = useAppSelector(state => state.remainders.loading);
  const refreshing = useAppSelector(state => state.remainders.refreshing);

  const [search, setSearch] = useState<string>('');
  const [isDataLoaded, setIsDataLoaded] = useState<boolean>(true);

  const loadRemainders = useCallback(
    (
      refreshing: boolean,
      loadMore: boolean,
      page: number,
      descending: boolean,
    ) => {
      if (currentGTochkaId)
        return dispatch(
          getRemainders(
            refreshing,
            loadMore,
            currentGTochkaId,
            page,
            descending,
            '',
            search,
            30,
          ),
        );
    },
    [currentGTochkaId, search],
  );

  useEffect(() => {
    loadRemainders(false, false, 0, remainders.descending);
  }, [remainders.descending, search]);

  const handleRefresh = () =>
    loadRemainders(true, false, 0, remainders.descending);

  const handleLoadMore = () => {
    if (isDataLoaded && remainders.data.hasNext) {
      setIsDataLoaded(false);
      loadRemainders(
        false,
        true,
        remainders.data.currentPage + 1,
        remainders.descending,
      )
        ?.then(() => setIsDataLoaded(true))
        .catch(() => setIsDataLoaded(true));
    }
  };

  const navToAddProductModal = (detail: TradeSessionDetail) =>
    navigation.navigate('AddProductModal', {
      detail,
      callback: () => setTimeout(navigation.goBack, 100),
      type: 'new',
    });

  const RenderFooter = () => (isDataLoaded ? <Fragment /> : <FooterLoader />);

  if (loading) return <Preloader />;

  return (
    <Layout style={{flex: 1}}>
      <ListHeaderComponent value={search} setValue={setSearch} />
      <List
        refreshing={refreshing}
        onRefresh={handleRefresh}
        onEndReachedThreshold={0.2}
        onEndReached={handleLoadMore}
        ListFooterComponent={RenderFooter}
        style={{
          backgroundColor: theme['background-basic-color-1'],
          paddingVertical: 10,
        }}
        data={details.map<TradeSessionDetail>(detail => ({
          ...detail,
          remainder: detail.amount,
        }))}
        renderItem={props => (
          <ListItem {...props} theme={theme} onPress={navToAddProductModal} />
        )}
      />
    </Layout>
  );
};

export default AddProduct;
