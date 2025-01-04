import React from 'react';

export enum LoginDataIndex {
  email = 'email',
  password = 'password',
}

export const LoginTitle: { [key in LoginDataIndex]: string } = {
  [LoginDataIndex.email]: 'email',
  [LoginDataIndex.password]: 'password',
};

export type LoginDataType = {
  key?: React.Key;
  [LoginDataIndex.email]: string;
  [LoginDataIndex.password]: string;
};