import { csvFormat, csvParse } from "d3";

const years = ["2000", "2004", "2008", "2012", "2016", "2020", "2024"];

let results = [] as any;

for (let year of years) {
    const file = await Bun.file(`srv/data/${year}/eprk_sex.csv`).text();
    const data = csvParse(file);
    const newData = data.map((d) => {
        d.ROK = year;
        return d;
    });
    results.push(...newData);
}


await Bun.write(`srv/data/candidates-combined.csv`, csvFormat(results));
