import classNames from 'classnames/bind';
import React, { memo, useCallback, useState } from 'react';
import styles from './index.module.scss';
import { searchSettings } from '../../../constants';

const BLOCK_NAME = 'Search-menu';
const cn = classNames.bind(styles);

export const MenuContainer = memo(() => {
  const [isOpen, setIsOpen] = useState(false);
  const onMenuClick = useCallback(() => setIsOpen(!isOpen), [isOpen, setIsOpen]);
  return (
    <div className={cn(`${BLOCK_NAME}`, { [`${BLOCK_NAME}--open`]: isOpen })}>
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
          <select className={cn(`${BLOCK_NAME}__selector`)} defaultValue="">
            {searchSettings.form.map((form) => <option key={form} value={form}>{form}</option>)}
          </select>
        </div>
        <div className={cn(`${BLOCK_NAME}__selector-container`)}>
          <select className={cn(`${BLOCK_NAME}__selector`)}>
            {searchSettings.type.map((type) => <option key={type} value={type}>{type}</option>)}
          </select>
        </div>
        <div className={cn(`${BLOCK_NAME}__selector-container`)}>
          <select className={cn(`${BLOCK_NAME}__selector`)}>
            {
              searchSettings.school.map((school) => (
                <option key={school} value={school}>
                  {school}
                </option>
              ))
            }
          </select>
        </div>
        <div className={cn(`${BLOCK_NAME}__selector-container`)}>
          <select className={cn(`${BLOCK_NAME}__selector`)}>
            {
              searchSettings.timeline.map((timeline) => (
                <option key={timeline} value={timeline}>
                  {timeline}
                </option>
              ))
            }
          </select>
        </div>
        <div className={cn(`${BLOCK_NAME}__search-button-container`)}>
          <button type="button" className={cn(`${BLOCK_NAME}__search-button`)}>
            Search
          </button>
        </div>
      </div>
    </div>
  );
});
