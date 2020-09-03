import React, { useState } from 'react';
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

const App = React.memo(({
  updateSearchSelectData,
  fetchNewItems,
  currentSettings,
  currentItem,
}) => {
  const [isMenuModalOpen, setIsMenuModalOpen] = useState(true);
  const modalHandleClick = () => {
    setIsMenuModalOpen(!isMenuModalOpen);
  };
  const modalHandleKeyDown = () => {};
  const updateSearchData = (value, settingsField) => {
    updateSearchSelectData({
      value,
      settingsField,
    });
  };

  return (
    <div className={cn(`${BLOCK_NAME}`)}>
      <div
        className={cn(`${BLOCK_NAME}__menu-modal`)}
        role="button"
        aria-label="Close menu"
        tabIndex={0}
        hidden={isMenuModalOpen}
        onClick={modalHandleClick}
        onKeyDown={modalHandleKeyDown}
      />
      <ImageView url={currentItem.imageURL} dimensions={currentItem.dimensions} />
      <MenuContainer
        currentSettings={currentSettings}
        updateSearchSelectData={updateSearchData}
        fetchNewItems={fetchNewItems}
        isMenuModalOpen={isMenuModalOpen}
        setIsMenuModalOpen={setIsMenuModalOpen}
      />
    </div>
  );
});

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
