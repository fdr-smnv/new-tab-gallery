import classNames from 'classnames/bind';
import React, { memo, useCallback } from 'react';
import { searchSettings } from '@newtab/constants';
import styles from './index.module.scss';

const BLOCK_NAME = 'Search-menu';
const cn = classNames.bind(styles);

export const MenuContainer = memo(({
  currentSettings, updateSearchSelectData, fetchNewItems, isMenuModalOpen, setIsMenuModalOpen,
}) => {
  const selectorOnChange = useCallback((event) => {
    const { value, title } = event.target;
    updateSearchSelectData(value, title);
  }, [updateSearchSelectData]);
  const menuButtonOnClick = useCallback(() => {
    setIsMenuModalOpen(!isMenuModalOpen);
  }, [isMenuModalOpen, setIsMenuModalOpen]);

  const searchButtonOnClick = useCallback(() => {
    fetchNewItems();
  }, [fetchNewItems]);
  return (
    <div className={cn(`${BLOCK_NAME}`, { [`${BLOCK_NAME}--open`]: !isMenuModalOpen })}>
      <div className={cn(`${BLOCK_NAME}__menu-wrapper`)}>
        <div
          className={cn(`${BLOCK_NAME}__open-button-container`)}
          hidden={!isMenuModalOpen}
        >
          <button
            type="button"
            onClick={menuButtonOnClick}
            aria-label="Open menu button"
            className="Search-menu__open-button__newtab-components-_components-menu-container-index-module--3n0lP"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 483.1 483.1">
              <path
                d="M2.7 366.4c6.8 4.9 21.5-1.2 37.2-15.5 28.1-25.7 56.6-51.4 83.4-78.6 41.4-41.9 81.7-84.9 122.4-127.4 67 79.4 145.5 150 217.8 225.4 3.4 3.6 11.4 6.6 14.9 6.6 6.9 0 5.3-7.4 0.9-16.3 -14.7-29.3-38.2-59.1-64.4-87.1 -51-54.3-101.2-109.2-154.5-161.7l-0.2-0.2 0 0c-7.4-7.3-19.3-7.2-26.6 0.2 -12.6 12.8-25.2 25.8-37.5 39 -8.4 7.9-16.8 15.7-25.1 23.6 -52.7 50.4-104.6 101.6-153 155.8C4.1 345.7-4.8 361.1 2.7 366.4z"
              />
            </svg>
          </button>
        </div>
        <div className={cn(`${BLOCK_NAME}__selectors`)}>
          <div className={cn(`${BLOCK_NAME}__selector-container`)}>
            <label className={cn(`${BLOCK_NAME}__selector-label`)}>
              <select title="form" value={currentSettings.form} onChange={selectorOnChange} className={cn(`${BLOCK_NAME}__selector`)}>
                {searchSettings.form.map((form) => <option key={form} value={form}>{form}</option>)}
              </select>
            </label>
          </div>
          <div className={cn(`${BLOCK_NAME}__selector-container`)}>
            <label className={cn(`${BLOCK_NAME}__selector-label`)}>
              <select title="type" value={currentSettings.type} onChange={selectorOnChange} className={cn(`${BLOCK_NAME}__selector`)}>
                {searchSettings.type.map((type) => <option key={type} value={type} className={cn(`${BLOCK_NAME}__option`)}>{type}</option>)}
              </select>
            </label>
          </div>
          <div className={cn(`${BLOCK_NAME}__selector-container`)}>
            <label className={cn(`${BLOCK_NAME}__selector-label`)}>

              <select title="school" value={currentSettings.school} onChange={selectorOnChange} className={cn(`${BLOCK_NAME}__selector`)}>
                {
              searchSettings.school.map((school) => (
                <option key={school} value={school}>
                  {school}
                </option>
              ))
            }
              </select>
            </label>
          </div>
          <div className={cn(`${BLOCK_NAME}__selector-container`)}>
            <label className={cn(`${BLOCK_NAME}__selector-label`)}>
              <select title="timeline" value={currentSettings.timeline} onChange={selectorOnChange} className={cn(`${BLOCK_NAME}__selector`)}>
                {
              searchSettings.timeline.map((timeline) => (
                <option key={timeline} value={timeline}>
                  {timeline}
                </option>
              ))
            }
              </select>
            </label>
          </div>
          <div className={cn(`${BLOCK_NAME}__search-button-container`)}>
            <button type="button" onClick={searchButtonOnClick} className={cn(`${BLOCK_NAME}__search-button`)}>
              Search
            </button>
          </div>
        </div>
      </div>
    </div>
  );
});
