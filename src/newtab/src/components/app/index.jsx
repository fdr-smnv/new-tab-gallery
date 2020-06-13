import React, { PureComponent } from 'react';
import classNames from 'classnames/bind';
import { connect } from 'react-redux';
import styles from './index.module.scss';
import {
  fetchSearchDataSagaAction,
  getLocalStorageDataSagaAction,
  setLocalStorageDataSagaAction,
} from '../../../../background/src/modules/data/actions';
import { MenuContainer } from '../_components/menu-container';
import { ImageView } from '../_components/image-view';
import { dataStorageSelector } from '../../../../background/src/modules/data/selectors';

const BLOCK_NAME = 'App';
const cn = classNames.bind(styles);

class App extends PureComponent {
  render() {
    const { data } = this.props;
    // const { currentItem, itemsArray, currentSettings } = data;

    return (
      <div className={cn(`${BLOCK_NAME}`)}>
        {
          JSON.stringify(
            data,
            null, 4,
          )
        }
        <ImageView />
        <MenuContainer />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  count: state.count,
  data: dataStorageSelector(state),
});

const mapDispatchToProps = {
  getLocalStorageData: getLocalStorageDataSagaAction,
  setLocalStorageData: setLocalStorageDataSagaAction,
  fetchSearchData: fetchSearchDataSagaAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
