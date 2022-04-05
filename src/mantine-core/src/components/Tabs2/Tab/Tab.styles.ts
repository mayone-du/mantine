import {
  createStyles,
  CSSObject,
  getSharedColorScheme,
  MantineColor,
  MantineTheme,
} from '@mantine/styles';
import { TabsVariant, TabsOrientation } from '../Tabs.types';

interface TabStylesParams {
  variant: TabsVariant;
  color: MantineColor;
  orientation: TabsOrientation;
  withIcon: boolean;
  withRightSection: boolean;
}

interface GetVariantReturnType {
  tab: CSSObject;
  tabActive: CSSObject;
}

function getVariantStyles(
  theme: MantineTheme,
  { variant, orientation, color }: TabStylesParams
): GetVariantReturnType {
  const vertical = orientation === 'vertical';
  const filledScheme = getSharedColorScheme({ color, theme, variant: 'filled' });

  if (variant === 'default') {
    return {
      tab: {
        [vertical ? 'borderRight' : 'borderBottom']: '2px solid transparent',
        [vertical ? 'marginRight' : 'marginBottom']: -2,
        [vertical ? 'borderBottomLeftRadius' : 'borderTopRightRadius']: theme.radius.sm,
        borderTopLeftRadius: theme.radius.sm,

        '&:hover': {
          backgroundColor:
            theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
          borderColor: theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3],
        },
      },

      tabActive: {
        borderColor: filledScheme.background,
        color: theme.colorScheme === 'dark' ? theme.white : theme.black,

        '&:hover': {
          borderColor: filledScheme.background,
        },
      },
    };
  }

  if (variant === 'outline') {
    return {
      tab: {
        background: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
        borderTopRightRadius: theme.radius.sm,
        borderTopLeftRadius: theme.radius.sm,
        border: '1px solid transparent',
        borderBottom: 'none',
      },

      tabActive: {
        borderColor: theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3],

        '&::before': {
          content: '""',
          backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
          position: 'absolute',
          bottom: -1,
          height: 1,
          right: 0,
          left: 0,
        },
      },
    };
  }

  if (variant === 'pills') {
    return {
      tab: {
        borderRadius: theme.radius.sm,

        '&:hover': {
          backgroundColor:
            theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
        },
      },

      tabActive: {
        backgroundColor: filledScheme.background,
        color: theme.white,

        '&:hover': {
          backgroundColor: filledScheme.background,
        },
      },
    };
  }

  return { tab: {}, tabActive: {} };
}

export default createStyles((theme, params: TabStylesParams) => {
  const variantStyles = getVariantStyles(theme, params);

  return {
    tabLabel: {},

    tab: {
      position: 'relative',
      padding: `${theme.spacing.xs}px ${theme.spacing.md}px`,
      paddingLeft: params.withIcon ? theme.spacing.xs : undefined,
      paddingRight: params.withRightSection ? theme.spacing.xs : undefined,
      fontSize: theme.fontSizes.sm,
      whiteSpace: 'nowrap',
      textAlign: 'center',
      zIndex: 0,
      display: 'flex',
      alignItems: 'center',
      lineHeight: 1,

      '&:disabled': {
        opacity: 0.5,
        cursor: 'not-allowed',

        '&:hover': {
          backgroundColor: 'transparent',
        },
      },

      '&:focus': {
        zIndex: 1,
      },

      ...variantStyles.tab,
    },

    tabActive: variantStyles.tabActive,

    tabRightSection: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',

      '&:not(:only-child)': {
        marginLeft: 7,
      },
    },

    tabIcon: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',

      '&:not(:only-child)': {
        marginRight: 7,
      },
    },
  };
});