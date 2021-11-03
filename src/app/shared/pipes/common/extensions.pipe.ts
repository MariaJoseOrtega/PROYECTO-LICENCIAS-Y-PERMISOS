import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'extensions'
})
export class ExtensionsPipe implements PipeTransform {

    transform(value: string, ...args: unknown[]): unknown {
        const pathAssets = 'assets/images/shared/files/';
        value = value ? value.toLowerCase() : value;
        switch (value) {
            case 'pdf':
                return pathAssets + 'pdf.png';

            case 'jpg':
            case 'jpeg':
            case 'png':
            case 'bmp':
            case 'tiff':
            case 'tif':
            case 'svg':
                return pathAssets + 'image.png';

            case 'txt':
            case 'doc':
            case 'docx':
                return pathAssets + 'doc.png';

            case 'xls':
            case 'xlsx':
            case 'csv':
                return pathAssets + 'excel.png';

            case 'zip':
            case 'rar':
            case '7z':
            case 'tar':
                return pathAssets + 'zip.png';

            case 'ptt':
            case 'pptx':
                return pathAssets + 'powerpoint.png';

            default:
                return pathAssets + 'other.png';
        }
    }

}
