import React, { PureComponent } from 'react';
import classNames from 'classnames/bind';
import { connect } from 'react-redux';
import {
  fetchNewItemsSagaAction,
  fetchSearchDataSagaAction,
  updateSearchSelectDataAction,
} from '@/background/modules/data/actions';
import { getCurrentItem, getCurrentSettings } from '@/background/modules/data/selectors';
import styles from './index.module.scss';
import { MenuContainer } from '../_components/menu-container';
import { ImageView } from '../_components/image-view';

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
    const { currentSettings, currentItem } = this.props;

    return (
      <div className={cn(`${BLOCK_NAME}`)}>
        <ImageView url={currentItem.imageURL} dimensions={currentItem.dimensions} />
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
  currentSettings: getCurrentSettings(state),
  currentItem: getCurrentItem(state),
});

const mapDispatchToProps = {
  fetchSearchData: fetchSearchDataSagaAction,
  fetchNewItems: fetchNewItemsSagaAction,
  updateSearchSelectData: updateSearchSelectDataAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
