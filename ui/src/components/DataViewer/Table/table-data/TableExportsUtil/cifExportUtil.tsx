export const generateCIFFile = (cifString: string) => {
    const blob = new Blob([cifString], { type: 'text/cif' });
    const file = new File([blob], 'text.cif', { type: 'text/cif' });
    return file;
};
