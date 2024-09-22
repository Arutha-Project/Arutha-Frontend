import { Select as AntdSelect, SelectProps as AntdSelectProps } from 'antd';

const Select = (props: AntdSelectProps) => {
  return (
    <AntdSelect
      {...props}
      filterOption={(input: string, option) =>
        String(option?.children ?? '')
          .toLowerCase()
          .includes(input.toLowerCase())
      }
    >
      {props.children}
    </AntdSelect>
  );
};

Select.Option = AntdSelect.Option;

export default Select;
