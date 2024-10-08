import OpenAI from 'openai';
import { csvFormat, csvParse } from 'd3';
import { dsvFormat } from 'd3-dsv'

const parser = dsvFormat(";")

const openai = new OpenAI({
    apiKey: Bun.env.KEY, // This is the default and can be omitted
});

async function askAI(input: string) {
    try {
        const chatCompletion = await openai.chat.completions.create({
            messages: [
                { role: 'system', content: 'Jsi pedantická češtinářka. Nesnášíš chyby. Dám ti jméno, příjmení a povolání člověka. Odhadni jeho pohlaví. Odpovídej jenom M nebo F. Ale opravdu se snaž, ať se nespleteš.' },
                { role: 'user', content: input }
            ],
            model: 'gpt-4o-mini',
        });
        return chatCompletion.choices[0].message.content;
    } catch (error) {
        console.error('Error in askAI:', error);
        return null;
    }
}


// const years = ["2000", "2004", "2008", "2012", "2016", "2020", "2024"]

const years = ["2024"]

for (const year of years) {
    let results: Array<{ JMENO: string; PRIJMENI: string; POVOLANI: string; POHLAVI: string }> = [];
    const file = await Bun.file(`srv/data/${year}/kzrk.csv`).text();
    const data = await year === "2020" ? parser.parse(file) : csvParse(file);


    for (const row of data) {
        const input = `${row.JMENO} ${row.PRIJMENI}, ${row.POVOLANI}`;
        const sex = await askAI(input);
        console.log(year, input, sex);
        results.push({
            ...row, POHLAVI: sex ?? '',
            JMENO: row.JMENO ?? '',
            PRIJMENI: row.PRIJMENI ?? '',
            POVOLANI: row.POVOLANI ?? ''
        });
    }

    Bun.write(`srv/data/${year}/eprk_sex.csv`, csvFormat(results));
    console.log(year, "done");
}

