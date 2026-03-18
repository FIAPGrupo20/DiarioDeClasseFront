export const theme = {
  colors: {
    ink: '#10233a',
    mutedInk: '#4e6076',
    sand: '#f7f0e8',
    paper: '#fffdf9',
    line: '#d8cdbf',
    accent: '#ef6c3e',
    accentDeep: '#c84e26',
    sage: '#6d8f72',
    sky: '#d9eef2',
    night: '#0d1726',
    success: '#2f8f63',
    danger: '#b8483e'
  },
  shadow: {
    soft: '0 22px 60px rgba(16, 35, 58, 0.10)',
    card: '0 14px 32px rgba(16, 35, 58, 0.08)'
  },
  radius: {
    lg: '28px',
    md: '20px',
    sm: '14px'
  },
  layout: {
    width: 'min(1180px, calc(100vw - 32px))'
  }
};

export type AppTheme = typeof theme;