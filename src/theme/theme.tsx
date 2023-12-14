import { COLORS } from "@/theme/colors";
import { ThemeConfig } from "antd";

export const themeConfig = {
  components: {
    Layout: {
      headerBg: COLORS.headerBg,
      siderBg: COLORS.siderBg.content,
      triggerBg: COLORS.siderBg.bottom
    },
    Menu: {
      darkItemBg: COLORS.siderBg.content,
      darkItemColor: COLORS.textColor,
      darkItemHoverColor: COLORS.textColorHover,
      darkSubMenuItemBg: COLORS.siderBg.content,
      darkItemSelectedColor: COLORS.textColor,
      darkGroupTitleColor: COLORS.textColor,
    }
  },
} as ThemeConfig
