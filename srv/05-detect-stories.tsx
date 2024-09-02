import { csvParse } from "d3-dsv";

const data = await Bun.file("srv/data/candidates-combined.csv").text();


const parsed = csvParse(data);

// find candidates that have the same JMENO, KRZAST and PRIJMENI, but different ROK

const duplicates = parsed.filter((candidate, index, candidates) => {
    return candidates.findIndex(c => c.JMENO === candidate.JMENO && c.KRZAST === candidate.KRZAST && c.PRIJMENI === candidate.PRIJMENI) !== index;
});

console.log(duplicates);


export { };