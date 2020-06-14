import React, { PureComponent } from 'react';
import classNames from 'classnames/bind';
import { connect } from 'react-redux';
import styles from './index.module.scss';
import {
  fetchNewItemsSagaAction,
  fetchSearchDataSagaAction,
  getLocalStorageDataSagaAction,
  setLocalStorageDataSagaAction,
  updateSearchSelectDataAction,
} from '../../../../background/src/modules/data/actions';
import { MenuContainer } from '../_components/menu-container';
import { ImageView } from '../_components/image-view';
import {
  getCurrentSettings,
  getDataStorage,
} from '../../../../background/src/modules/data/selectors';

const BLOCK_NAME = 'App';
const cn = classNames.bind(styles);

class App extends PureComponent {
  updateSearchSelectData = (value, settingsField) => {
    const { updateSearchSelectData } = this.props;
    updateSearchSelectData({ value, settingsField });
  }

  fetchNewItems = () => {
    const { fetchNewItems } = this.props;
    fetchNewItems();
  }

  render() {
    const { data, currentSettings } = this.props;
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
        <MenuContainer
          currentSettings={currentSettings}
          updateSearchSelectData={this.updateSearchSelectData}
          fetchNewItems={this.fetchNewItems}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  count: state.count,
  data: getDataStorage(state),
  currentSettings: getCurrentSettings(state),
});

const mapDispatchToProps = {
  getLocalStorageData: getLocalStorageDataSagaAction,
  setLocalStorageData: setLocalStorageDataSagaAction,
  fetchSearchData: fetchSearchDataSagaAction,
  fetchNewItems: fetchNewItemsSagaAction,
  updateSearchSelectData: updateSearchSelectDataAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
