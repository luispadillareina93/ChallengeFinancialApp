import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'FilterPipe'
})
export class Filterpipe implements PipeTransform {

    transform(data: any, filter: any, filterMetaData: any): any {
        if (!filter || !Array.isArray(data)) {
            filterMetaData.count = data.length;
            return data;
        }
        else if (filter && Array.isArray(data)) {
            let keys = Object.keys(filter);
            let result = data.filter(item => {
                return keys.some((keyname) => {
                    return new RegExp(filter[keyname], 'gi').test(item[keyname])
                        || filter[keyname] == "";
                })
            })
            filterMetaData.count = result.length;
            return result;
        }
    }
}