import React, {Fragment, useCallback, useState} from 'react';
import {ListRenderItemInfo, StyleSheet, View} from 'react-native';
import {Divider, Layout, List, Text} from '@ui-kitten/components';

import Filter from './Filter';

import {useAppDispatch, useAppSelector} from '../../../../../redux';
import {even} from '../../../../../utils';
import {RemaindersDetail} from '../../../../../utils/api.types';
import {useFocusEffect} from '@react-navigation/core';
import {
  clearRemainders,
  getRemainders,
} from '../../../../../redux/actions/private/remaindersActions';
import FooterLoader from '../../../../general/FooterLoader';
import Preloader from '../../../../loaders/Preloader';

const Remainders: React.FC = () => {
  const dispatch = useAppDispatch();
  const currentGTochkaId = useAppSelector(
    state => state.main.tradePoint?.gTochkaId,
  );

  const remainders = useAppSelector(state => state.remainders);
  const details = useAppSelector(state => state.remainders.data.details);
  const loading = useAppSelector(state => state.remainders.loading);
  const refreshing = useAppSelector(state => state.remainders.refreshing);

  const [cnt, setCnt] = useState<string>('');
  const [filter, setFilter] = useState<string>('');
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
            cnt,
            filter,
          ),
        );
    },
    [currentGTochkaId, cnt, filter],
  );

  useFocusEffect(
    useCallback(() => {
      loadRemainders(false, false, 0, remainders.descending);
      return () => dispatch(clearRemainders());
    }, []),
  );

  const RenderItem = useCallback<
    (props: ListRenderItemInfo<RemaindersDetail>) => JSX.Element
  >(
    ({item, index}) => {
      const level = even(index) ? '2' : '1';
      return (
        <Layout key={index} level={level} style={styles.tableHead}>
          <View style={{flex: 3}}>
            <Text style={{marginBottom: 3}}>{item.groupName}</Text>
            <Text category="p2" appearance="hint" numberOfLines={1}>
              {item.name}
            </Text>
          </View>
          <View style={styles.tableRemainder}>
            <Text category="p2" appearance="hint">
              {item.amount.toFixed(1)}
            </Text>
          </View>
        </Layout>
      );
    },
    [details],
  );

  const handleRefreshOrSearch = () =>
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

  const RenderFooter = () => (isDataLoaded ? <Fragment /> : <FooterLoader />);

  if (loading) return <Preloader />;

  return (
    <Layout style={{flex: 1}}>
      <Filter
        cnt={cnt}
        setCnt={setCnt}
        filter={filter}
        setFilter={setFilter}
        handleSearch={handleRefreshOrSearch}
      />
      <Divider />

      <View style={styles.tableHead}>
        <Text appearance="hint" style={{flex: 3}}>
          Товар
        </Text>
        <Text appearance="hint" style={styles.tableHeadRemainder}>
          Остаток
        </Text>
      </View>
      <Divider />

      <List
        ListFooterComponent={RenderFooter}
        refreshing={refreshing}
        onRefresh={handleRefreshOrSearch}
        data={details}
        renderItem={RenderItem}
        onEndReachedThreshold={0.2}
        onEndReached={handleLoadMore}
      />
    </Layout>
  );
};

const styles = StyleSheet.create({
  tableHead: {
    flexDirection: 'row',
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  tableHeadRemainder: {flex: 1, textAlign: 'right'},
  tableRemainder: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  item: {flex: 3},
  remainder: {flex: 1, textAlign: 'right'},
});

export default Remainders;
