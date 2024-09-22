interface ColorIntensities {
  Deep: string;
  Bold: string;
  Vibrant: string;
  Moderate: string;
  Subtle: string;
  Light: string;
  Soft: string;
  Delicate: string;
}

export enum Intensity {
  Deep = 'Deep',
  Bold = 'Bold',
  Vibrant = 'Vibrant',
  Moderate = 'Moderate',
  Subtle = 'Subtle',
  Light = 'Light',
  Soft = 'Soft',
  Delicate = 'Delicate',
}

export enum Color {
  blackColor = '@black-color',
  whiteColor = '@white-color',
  neutralColor = '@neutral-color',
  primaryColor = '@primary-color',
  secondaryColor = '@secondary-color',
  dangerColor = '@danger-status-color',
  warningColor = '@warning-status-color',
  successColor = '@success-status-color',
  upcomingColor = '@upcoming-status-color',
  unknownColor = '@warning-status-color',
  purpleColor = '@purple-color',
}

export type ICustomTheme = {
  [key in Color]: string | ColorIntensities;
};

export type ColorIntensityKeys = keyof ColorIntensities;

export const upcomingColorIntensities: ColorIntensities = {
  Deep: '#172554',
  Bold: '#5295E2',
  Vibrant: '',
  Moderate: '',
  Subtle: '',
  Light: '#E5EAF5',
  Soft: '#DBEAFE',
  Delicate: '',
};

export const neutralColorIntensities: ColorIntensities = {
  Deep: '#1F1F1F',
  Bold: '#4B4B4B',
  Vibrant: '#8E8E8E',
  Moderate: '#CACACA',
  Subtle: '#E1E1E1',
  Light: '#EEEEEE',
  Soft: '#F5F5F5',
  Delicate: '#FAFAFA',
};

export const primaryColorIntensities: ColorIntensities = {
  Deep: '#CC6E00',
  Bold: '#FF8900',
  Vibrant: '#FFA133',
  Moderate: '#FFB866',
  Subtle: '#FFD099',
  Light: '#FFDBB2',
  Soft: '#FFF3E5',
  Delicate: '#FFF9F2',
};

export const secondaryColorIntensities: ColorIntensities = {
  Deep: '#182630',
  Bold: '#223645',
  Vibrant: '#384A57',
  Moderate: '#4E5E6A',
  Subtle: '#7A868F',
  Light: '#A7AFB5',
  Soft: '#E8EBEC',
  Delicate: '#F4F5F6',
};

export const dangerStatusColorIntensities: ColorIntensities = {
  Deep: '#FF1E1E',
  Bold: '#F64C4C',
  Vibrant: '#EB6F70',
  Moderate: '#F49898',
  Subtle: '#FFCCD2',
  Light: '#FFEBEE',
  Soft: '#FEF2F2',
  Delicate: '#FFFBFB',
};

export const warningStatusColorIntensities: ColorIntensities = {
  Deep: '#FE9B0E',
  Bold: '#FFAD0D',
  Vibrant: '#FFC62B',
  Moderate: '#FFDD82',
  Subtle: '#FFEAB3',
  Light: '#FFF7E1',
  Soft: '#FFF9EE',
  Delicate: '#FFFDFA',
};

export const successStatusColorIntensities: ColorIntensities = {
  Deep: '#3EAE2C',
  Bold: '#47B881',
  Vibrant: '#6BC497',
  Moderate: '#97D4B4',
  Subtle: '#C0E5D1',
  Light: '#E5F5EC',
  Soft: '#F2FAF6',
  Delicate: '#FBFEFC',
};

export const purpleColorIntensities: ColorIntensities = {
  Deep: '',
  Bold: '#8E56FF',
  Vibrant: '',
  Moderate: '',
  Subtle: '',
  Light: '#F1EBF8',
  Soft: '',
  Delicate: '',
};

const customTheme: ICustomTheme = {
  [Color.blackColor]: '#000000',
  [Color.whiteColor]: '#FFFFFF',
  [Color.neutralColor]: neutralColorIntensities,
  [Color.primaryColor]: primaryColorIntensities,
  [Color.secondaryColor]: secondaryColorIntensities,
  [Color.dangerColor]: dangerStatusColorIntensities,
  [Color.warningColor]: warningStatusColorIntensities,
  [Color.successColor]: successStatusColorIntensities,
  [Color.upcomingColor]: upcomingColorIntensities,
  [Color.purpleColor]: purpleColorIntensities,
};

export function getThemeColor(color: Color, intensity?: ColorIntensityKeys): string {
  const selectedColor = color;
  if (selectedColor === Color.blackColor || selectedColor === Color.whiteColor) {
    const result = customTheme[selectedColor] as string;
    return result;
  }

  const result = (customTheme[selectedColor] as ColorIntensities)[intensity || Intensity.Moderate];
  return result;
}

export default customTheme;
