/*
 *  Copyright 2022 Collate.
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *  http://www.apache.org/licenses/LICENSE-2.0
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

import {
  ArrowLeftOutlined,
  ArrowRightOutlined,
  DownOutlined,
} from '@ant-design/icons';
import { Button, Dropdown } from 'antd';
import classNames from 'classnames';
import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import {
  PAGE_SIZE_BASE,
  PAGE_SIZE_LARGE,
  PAGE_SIZE_MEDIUM,
} from '../../../constants/constants';
import { CursorType } from '../../../enums/pagination.enum';
import { computeTotalPages } from '../../../utils/PaginationUtils';
import { NextPreviousProps, PagingProps } from './NextPrevious.interface';

const NextPrevious: FC<NextPreviousProps> = ({
  className,
  paging,
  pagingHandler,
  pageSize,
  isNumberBased = false,
  currentPage = 1,
  isLoading,
  ...pagingProps
}: NextPreviousProps) => {
  const { t } = useTranslation();
  const {
    pageSizeOptions = [PAGE_SIZE_BASE, PAGE_SIZE_MEDIUM, PAGE_SIZE_LARGE],
    onShowSizeChange,
  } = (pagingProps ?? {}) as PagingProps;

  const onNextHandler = () => {
    if (isNumberBased) {
      pagingHandler({ currentPage: currentPage + 1 });
    } else {
      pagingHandler({
        cursorType: CursorType.AFTER,
        currentPage: currentPage + 1,
      });
    }
  };

  const onPreviousHandler = () => {
    if (isNumberBased) {
      pagingHandler({ currentPage: currentPage - 1 });
    } else {
      pagingHandler({
        cursorType: CursorType.BEFORE,
        currentPage: currentPage - 1,
      });
    }
  };

  const computePrevDisableState = () => {
    if (isNumberBased) {
      return currentPage === 1;
    } else {
      return paging.before ? false : true;
    }
  };

  const computeNextDisableState = () => {
    if (isNumberBased) {
      const totalPages = computeTotalPages(pageSize, paging.total);

      return currentPage === totalPages;
    } else {
      return paging.after ? false : true;
    }
  };

  return (
    <div
      className={classNames('flex-center gap-3', className)}
      data-testid="pagination">
      <Button
        ghost
        className="hover-button text-sm flex-center"
        data-testid="previous"
        disabled={computePrevDisableState() || isLoading}
        icon={<ArrowLeftOutlined />}
        type="primary"
        onClick={onPreviousHandler}>
        <span>{t('label.previous')}</span>
      </Button>
      <span data-testid="page-indicator">{`${currentPage}/${computeTotalPages(
        pageSize,
        paging.total
      )} ${t('label.page')}`}</span>
      <Button
        ghost
        className="hover-button text-sm flex-center"
        data-testid="next"
        disabled={computeNextDisableState() || isLoading}
        type="primary"
        onClick={onNextHandler}>
        <span> {t('label.next')}</span>
        <ArrowRightOutlined />
      </Button>
      {onShowSizeChange && (
        <Dropdown
          disabled={isLoading}
          menu={{
            items: pageSizeOptions.map((size) => ({
              label: `${size} / ${t('label.page')}`,
              value: size,
              key: size,
              onClick: () => onShowSizeChange(size),
            })),
          }}>
          <Button
            data-testid="page-size-selection-dropdown"
            onClick={(e) => e.preventDefault()}>
            {`${pageSize} / ${t('label.page')}`}
            <DownOutlined />
          </Button>
        </Dropdown>
      )}
    </div>
  );
};

export default NextPrevious;
