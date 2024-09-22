import { ConfigProvider, Table as AntdTable, Tooltip } from 'antd';
import type { ColumnType } from 'antd/es/table';
import styles from './Table.module.scss';

import {
  jumpButtonStyle,
  nextButtonStyle,
  pageButtonStyle,
  prevButtonStyle,
  sortTitleContainerStyle,
  sortTitleStyle,
  tableTheme,
} from './TableStyle';
import { getThemeColor, Color, Intensity } from '@theme';
import { ColumnTitleProps, TableRowSelection } from 'antd/es/table/interface';
import React, { useEffect } from 'react';
import { Button, Icon } from '..';
import { TableColumnType } from '@constants';

export type ITableColumn = ColumnType<any> & {
  columnType?: TableColumnType.text | TableColumnType.numeric | TableColumnType.date;
  columnTitle: string;
  isSortAvailable: boolean;
};

export interface TableProps<T> {
  columns: ITableColumn[];
  dataSource: Array<T>;
  setPageTotal: React.Dispatch<React.SetStateAction<number>>;
  loading: boolean;
  onRowClick?: (record: T) => void;
  hasPointerCursor?: boolean;
  rowSelection?: TableRowSelection<any>;
}

const getRowClassName = (record: any, index: number, hasPointerCursor?: boolean): string => {
  if (hasPointerCursor) {
    return index % 2 === 0
      ? styles.tableEvenRowWithPointerCursor
      : styles.tableOddRowWithPointerCursor;
  }

  return index % 2 === 0 ? styles.tableEvenRow : styles.tableOddRow;
};

const compareDates = (date1: string, date2: string) => {
  const d1 = new Date(date1);
  const d2 = new Date(date2);

  if (d1 < d2) {
    return -1; // date1 is earlier than date2
  } else if (d1 > d2) {
    return 1; // date1 is later than date2
  } else {
    return 0; // date1 and date2 are the same
  }
};

// update sort function according to the column type
const updateSortFunction = (requestedColumns: ITableColumn[]): ITableColumn[] => {
  requestedColumns = requestedColumns.map((column) => {
    if (!column.key || !column.isSortAvailable) return column;
    const key = column.key as string;

    if (column.columnType === TableColumnType.text) {
      column.sorter = (value1: any, value2: any) =>
        (value1[key] as string).localeCompare(value2[key] as string);
    } else if (column.columnType === TableColumnType.numeric) {
      column.sorter = (value1: any, value2: any) => value1[key] - value2[key];
    } else if (column.columnType === TableColumnType.date) {
      column.sorter = (value1: any, value2: any) => compareDates(value1[key], value2[key]);
    }

    return column;
  });
  return requestedColumns;
};

const handleTitleIfSortColumn = (column: ITableColumn) => {
  const columnClone = structuredClone(column);

  if (!columnClone.dataIndex || !columnClone.isSortAvailable || !columnClone.key)
    return columnClone;

  // if column has sort available
  const key = columnClone.key;
  columnClone.title = (titleProps) =>
    updateTitleAccordingSortColumns(key, columnClone.columnTitle, titleProps);

  return columnClone;
};

const updateColumnTitleElement = (requestedColumns: ITableColumn[]): ITableColumn[] => {
  requestedColumns = requestedColumns.map((column) => {
    column.title = () => <div>{column.columnTitle}</div>;
    // handleTitleIfSortColumn(column)
    return column;
  });
  return requestedColumns;
};

// update title of the sorting column
const updateTitleAccordingSortColumns = (
  requestedKey: React.Key,
  columnTitle: string,
  titleProps: ColumnTitleProps<any>
) => {
  const sortedColumn = titleProps.sortColumns?.find(({ column }) => column.key === requestedKey);
  return (
    <div style={sortTitleContainerStyle}>
      <div style={sortTitleStyle}>{columnTitle}</div>
      <div>
        <Icon
          iconName="SortIcon"
          iconStyle={{
            downArrowColor:
              sortedColumn?.order === 'ascend'
                ? getThemeColor(Color.primaryColor, Intensity.Bold)
                : undefined,
            upArrowColor:
              sortedColumn?.order === 'descend'
                ? getThemeColor(Color.primaryColor, Intensity.Bold)
                : undefined,
          }}
        />
      </div>
    </div>
  );
};

const handleColumnConfiguration = (requestedColumns: ITableColumn[]): ITableColumn[] => {
  requestedColumns = updateSortFunction(requestedColumns);

  requestedColumns = updateColumnTitleElement(requestedColumns);

  requestedColumns = requestedColumns.map((column: ITableColumn) => {
    const refactoredColumn: ITableColumn = {
      ...column,
      title: () => (
        <Tooltip title={column.columnTitle} placement="bottom">
          {column.columnTitle}
        </Tooltip>
      ),
    };
    if (column.columnType === TableColumnType.text) {
      return { ...refactoredColumn, ellipsis: true };
    }

    return refactoredColumn;
  });

  return requestedColumns;
};

const Table: React.FC<TableProps<any>> = <T,>({
  loading,
  columns,
  dataSource,
  setPageTotal,
  onRowClick,
  hasPointerCursor = false,
  rowSelection = undefined,
}: TableProps<T>) => {
  const [currentPage, setCurrentPage] = React.useState<number>(1);

  const memoizedColumnConfiguration = React.useMemo(() => {
    return handleColumnConfiguration(columns);
  }, [columns]);

  useEffect(() => {
    if (dataSource && dataSource.length) {
      setPageTotal(dataSource.length);
    }
  }, [dataSource, setPageTotal]);

  const customItemRender = (
    current: number,
    type: 'page' | 'next' | 'prev' | 'jump-prev' | 'jump-next',
    originalElement: React.ReactNode
  ) => {
    if (type === 'page') {
      return <Button style={pageButtonStyle(current, currentPage)} text={current.toString()} />;
    }

    if (type === 'next') {
      return <Button style={nextButtonStyle} icon={<Icon iconName="ArrowLeftIcon" />} />;
    }

    if (type === 'prev') {
      return (
        <Button
          disabled={current === 1}
          style={prevButtonStyle}
          icon={<Icon iconName="ArrowRightIcon" />}
        />
      );
    }

    if (type === 'jump-next' || type === 'jump-prev') {
      return <Button style={jumpButtonStyle} icon={<Icon iconName="MoreIcon" />} />;
    }

    return originalElement;
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  return (
    <ConfigProvider theme={tableTheme}>
      <AntdTable
        rowSelection={rowSelection}
        loading={loading}
        scroll={{ x: 1300 }}
        pagination={{
          pageSizeOptions: [5, 10, 20, 50, 100],
          defaultPageSize: 5,
          position: ['bottomCenter'],
          itemRender: customItemRender,
          onChange: handlePageChange,
          showSizeChanger: true,
        }}
        rowClassName={(record, index) => getRowClassName(record, index, hasPointerCursor)}
        dataSource={dataSource}
        columns={memoizedColumnConfiguration}
        onRow={(record) => ({
          onClick: () => onRowClick && onRowClick(record),
        })}
        showSorterTooltip={false}
      />
    </ConfigProvider>
  );
};

export default Table;
