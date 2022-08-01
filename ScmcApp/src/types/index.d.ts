import { ThemeOverride } from '../App.tsx'

declare global {
  namespace ReactNativePaper {
    interface Theme extends ThemeOverride
  }
}