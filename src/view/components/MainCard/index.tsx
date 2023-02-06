import { forwardRef, Ref } from 'react';
import { useTheme } from '@mui/material/styles';
import {
  Card,
  CardContent,
  CardHeader,
  CardProps,
  Divider,
  SxProps,
  Typography
} from '@mui/material';

import Highlighter from 'src/view/components/third-party/Hightlighter';

// header style
const headerSX = {
  p: 2.5,
  '& .MuiCardHeader-action': { m: '0px auto', alignSelf: 'center', },
};

type CustomMainCardProps = Pick<CardProps, 'sx' | 'children'> & {
  border?: boolean;
  boxShadow?: boolean;
  shadow?: string;
  darkTitle?: boolean;
  secondary?: React.ReactNode;
  divider?: boolean;
  contentSX?: SxProps;
  content?: boolean;
  codeHighlight?: boolean;
  elevation?: number;
  title?: string;
};

const MainCard = forwardRef(function MainCard(
  props: CustomMainCardProps,
  ref: Ref<HTMLDivElement>
) {
  const {
    border = true,
    boxShadow,
    children,
    content = true,
    contentSX = {},
    darkTitle,
    divider = true,
    elevation,
    secondary,
    shadow,
    sx = {},
    title,
    codeHighlight,
    ...others
  } = props;
  const theme = useTheme();
  const _boxShadow =
    theme.palette.mode === 'dark' ? boxShadow || true : boxShadow;

  return (
    <Card
      elevation={elevation || 0}
      ref={ref}
      {...others}
      sx={{
        ...sx,
        border: border ? '1px solid' : 'none',
        borderRadius: 2,
        borderColor:
          theme.palette.mode === 'dark'
            ? theme.palette.divider
            : theme.palette.grey.A700,
        boxShadow:
          _boxShadow && (!border || theme.palette.mode === 'dark')
            ? shadow || theme.shadows[9]
            : 'inherit',
        ':hover': {
          boxShadow: _boxShadow ? shadow || theme.shadows[9] : 'inherit',
        },
        '& pre': {
          m: 0,
          p: '16px !important',
          fontFamily: theme.typography.fontFamily,
          fontSize: '0.75rem',
        },
      }}
    >
      {/* card header and action */}
      {!darkTitle && title && (
        <CardHeader
          sx={headerSX}
          titleTypographyProps={{ variant: 'subtitle1', }}
          title={title}
          action={secondary}
        />
      )}
      {darkTitle && title && (
        <CardHeader
          sx={headerSX}
          title={<Typography variant="h3">{title}</Typography>}
          action={secondary}
        />
      )}

      {/* content & header divider */}
      {title && divider && <Divider />}

      {/* card content */}
      {content && <CardContent sx={contentSX}>{children}</CardContent>}
      {!content && children}

      {/* card footer - clipboard & highlighter  */}
      {codeHighlight && (
        <>
          <Divider sx={{ borderStyle: 'dashed', }} />
          <Highlighter codeHighlight={codeHighlight}>{children}</Highlighter>
        </>
      )}
    </Card>
  );
});

export default MainCard;
