import JSZip from 'jszip';

const urls = [
    "https://volby.cz/opendata/ep2004/EP2004_reg_20230223_csv.zip",
    "https://volby.cz/opendata/ep2004/EP2004_cisel_20230223_csv.zip",
    "https://volby.cz/opendata/ep2009/EP2009_reg_20230223_csv.zip",
    "https://volby.cz/opendata/ep2009/EP2009_cisel_20230223_csv.zip",
    "https://volby.cz/opendata/ep2014/EP2014_reg_20230223_csv.zip",
    "https://volby.cz/opendata/ep2014/EP2014_cisel_20230223_csv.zip",
    "https://volby.cz/opendata/ep2019/EP2019reg20190526_csv.zip",
    "https://volby.cz/opendata/ep2019/EP2019ciselniky20190513_csv.zip",
    "https://volby.cz/opendata/ep2024/EP2024reg20240506_csv.zip",
    "https://volby.cz/opendata/ep2024/EP2024ciselniky20240506_csv.zip"
]

// downloas each zip file and extract it
for (const url of urls) {
    const response = await fetch(url);
    const zip = await JSZip.loadAsync(await response.arrayBuffer());
    const files = Object.keys(zip.files);
    const matchResult = url.match(/ep(\d{4})/);
    const year = matchResult ? matchResult[1] : "unknown";
    for (const file of files) {
        const fileEntry = zip.file(file);
        const content = fileEntry ? await fileEntry.async("string") : "";
        if (file.startsWith("csv/")) {
            console.log("skipping", file)
            continue;
        }
        if (file.startsWith("csv_od/")) {
            console.log("writing", file.replace("csv_od/", ""))
            const path = `./srv/data/${year}/${file.replace("csv_od/", "")}`;
            await Bun.write(path, content)
            continue;
        }
        const path = `./srv/data/${year}/${file}`;
        console.log("writing", file)
        await Bun.write(path, content)
    }

}