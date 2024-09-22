import { BaseOptionType } from '@node_modules/rc-select/lib/Select';
import React from 'react';
import { AutoComplete, Input } from 'antd';
import { autoCompleteChildInput, autoCompleteInputStyle } from './AutoCompleteInputStyle';
import './AutoCompleteInputStyle.css';
import { CloseCircle as CloseCircleIcon, SearchNormal1 as SearchNormal1Icon } from 'iconsax-react';
import { getThemeColor, Color, Intensity } from '@theme';

export interface AutoCompleteInputProps {
  autoSelectOptions: Array<BaseOptionType>;
  handleAutoCompleteSearch: (selectedValue: string) => void;
  isDisabled?: boolean;
}

const AutoCompleteInput: React.FC<AutoCompleteInputProps> = ({
  autoSelectOptions,
  handleAutoCompleteSearch,
  isDisabled = false,
}) => {
  const [value, setValue] = React.useState<string | undefined>();

  const handleSearch = (searchText: any) => {
    setValue(searchText);
    if (searchText === '') {
      handleAutoCompleteSearch('');
    }
  };

  const handleSelect = (value: any) => {
    setValue(value);
    handleAutoCompleteSearch(value);
  };

  const handleClear = () => {
    setValue(undefined);
    handleAutoCompleteSearch('');
  };

  const handleKeyDown = React.useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === 'Enter' && value) {
        setValue(value);

        handleAutoCompleteSearch(value);
      }
    },
    [value, handleAutoCompleteSearch]
  );

  const filterOptions = (inputValue: string, option?: BaseOptionType): boolean =>
    option?.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1;

  const renderInputSuffix = value ? (
    <CloseCircleIcon
      variant={'Bold'}
      size={20}
      color={getThemeColor(Color.neutralColor, Intensity.Moderate)}
      onClick={handleClear}
    />
  ) : (
    <SearchNormal1Icon size={20} color={getThemeColor(Color.primaryColor, Intensity.Bold)} />
  );

  return (
    <AutoComplete
      disabled={isDisabled}
      value={value}
      onChange={handleSearch}
      onSelect={handleSelect}
      onKeyDown={handleKeyDown}
      autoFocus={value !== undefined}
      style={autoCompleteInputStyle}
      placeholder={'Search'}
      options={autoSelectOptions}
      filterOption={filterOptions}
      defaultActiveFirstOption={false}
    >
      <Input disabled={isDisabled} style={autoCompleteChildInput} suffix={renderInputSuffix} />
    </AutoComplete>
  );
};

export default AutoCompleteInput;
