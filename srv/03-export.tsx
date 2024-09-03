import { csvParse, tsvFormat } from 'd3';
import { dsvFormat } from 'd3-dsv'
const parser = dsvFormat(";")



const years = ["2000", "2004", "2008", "2012", "2016", "2020", "2024"];

for (const year of years) {
    const file = await Bun.file(`./srv/data/${year}/eprk_sex.csv`).text();
    const data = csvParse(file);

    const EPRKLfile = await Bun.file(`./srv/data/${year}/kzrkl.csv`).text();
    const EPRKLdata = year === "2020" ? parser.parse(EPRKLfile) : csvParse(EPRKLfile);

    const newData = data.filter(item => (item.JMENO !== "Registrační úřad ponechal pozici volnou" && item.PLATNOST === "A")).map((d: any) => {
        const foundItem = EPRKLdata.find(item => item.KSTRANA === d.KSTRANA);
        const VSTRANA = foundItem ? foundItem.VSTRANA : undefined;

        return { ...d, ROK: year, VSTRANA }
    })


    const tsv = tsvFormat(newData);
    await Bun.write(`./public/data/${year}/kand.tsv`, tsv);
}



// číselník volebních stran
const cvsFile = await Bun.file(`./srv/data/2024/cvs.csv`).text();
const cvsData = csvParse(cvsFile);

for (const year of ["2000", "2004", "2008", "2012"]) {
    const file = await Bun.file(`./srv/data/${year}/cvs.csv`).text();
    const data = csvParse(file);
    for (const item of data) {
        if (!cvsData.find((d: any) => d.VSTRANA === item.VSTRANA)) {
            cvsData.push(item);
        }
    }
}
const tsv = tsvFormat(cvsData);
await Bun.write(`./public/data/2024/cvs.tsv`, tsv);
