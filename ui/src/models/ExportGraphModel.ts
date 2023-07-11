export interface ExportGraphSettings {
    showCurves: boolean;
    showSliderBar: boolean;
    showLabels: boolean;
    showColorKey: boolean;
    fileType: ExportGraphFileType;
}

export enum ExportGraphFileType {
    png = 'png',
    pdf = 'pdf'
}

export const InitalExportGraphSettingsState = {
    showCurves: true,
    showSliderBar: true,
    showLabels: true,
    showColorKey: true,
    fileType: ExportGraphFileType.png
};
