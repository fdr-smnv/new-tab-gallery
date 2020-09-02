import classNames from 'classnames/bind';
import React, { memo, useCallback, useState } from 'react';
import { searchSettings } from '@newtab/constants';
import styles from './index.module.scss';

const BLOCK_NAME = 'Search-menu';
const cn = classNames.bind(styles);

export const MenuContainer = memo(({ currentSettings, updateSearchSelectData, fetchNewItems }) => {
  const [isOpen, setIsOpen] = useState(false);

  const onMenuClick = useCallback(() => setIsOpen(!isOpen), [isOpen, setIsOpen]);

  const selectorOnChange = useCallback((event) => {
    const { value, title } = event.target;
    updateSearchSelectData(value, title);
  }, [updateSearchSelectData]);

  const searchButtonOnClick = useCallback(() => {
    fetchNewItems();
  }, [fetchNewItems]);
  return (
    <div className={cn(`${BLOCK_NAME}`, { [`${BLOCK_NAME}--open`]: isOpen })}>
      <div className={cn(`${BLOCK_NAME}__menu-wrapper`)}>
        <div className={cn(`${BLOCK_NAME}__open-button-container`)}>
          <button
            type="button"
            onClick={onMenuClick}
            aria-label="Open menu button"
            className={cn(`${BLOCK_NAME}__open-button`)}
          />
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
