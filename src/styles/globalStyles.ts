export const hideScrollbarStyles = `
  /* Ocultar scrollbar para Chrome, Safari y Opera */
  *::-webkit-scrollbar {
    display: none;
  }

  /* Ocultar scrollbar para IE, Edge y Firefox */
  * {
    -ms-overflow-style: none;  /* IE y Edge */
    scrollbar-width: none;  /* Firefox */
  }
  
  /* Clase específica para componentes con scroll */
  .hide-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
  
  .hide-scrollbar::-webkit-scrollbar {
    display: none;
    width: 0;
    height: 0;
  }
`;

export const scrollContainerStyles = {
  height: '90vh',
  overflow: 'auto',
  width: '100%',
  position: 'relative',
  borderRadius: '4px',
  '& > div': {
    overflow: 'visible !important'
  }
};

export const productGridStyles = {
  overflowX: 'hidden' as const,
  overflowY: 'auto' as const,
  position: 'relative' as const,
  paddingRight: '1px',
  marginRight: '-1px'
}; 