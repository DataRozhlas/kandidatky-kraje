import JSZip from 'jszip';


const urls = [
    "https://volby.cz/opendata/kz2000/KZ2000_reg_20230223_csv.zip",
    "https://volby.cz/opendata/kz2000/KZ2000_cisel_20230223_csv.zip",
    "https://volby.cz/opendata/kz2004/KZ2004_reg_20230223_csv.zip",
    "https://volby.cz/opendata/kz2004/KZ2004_cisel_20230223_csv.zip",
    "https://volby.cz/opendata/kz2008/KZ2008_reg_20230223_csv.zip",
    "https://volby.cz/opendata/kz2008/KZ2008_cisel_20230223_csv.zip",
    "https://volby.cz/opendata/kz2012/KZ2012_reg_20230223_csv.zip",
    "https://volby.cz/opendata/kz2012/KZ2012_cisel_20230223_csv.zip",
    "https://volby.cz/opendata/kz2016/KZ2016_reg_20230223_csv.zip",
    "https://volby.cz/opendata/kz2016/KZ2016_cisel_20230223_csv.zip",
    "https://volby.cz/opendata/kz2020/KZ2020reg20201004a_csv.zip",
    "https://volby.cz/opendata/kz2020/KZ2020ciselniky20200918_csv.zip",
    "https://www.volby.cz/opendata/kz2024/KZ2024reg20240921_csv.zip",
    "https://www.volby.cz/opendata/kz2024/KZ2024ciselniky20240921_csv.zip"]



// downloas each zip file and extract it
for (const url of urls) {
    const response = await fetch(url);
    console.log("downloading", url)
    const zip = await JSZip.loadAsync(await response.arrayBuffer());
    console.log("extracting", url)
    const files = Object.keys(zip.files);
    const matchResult = url.match(/kz(\d{4})/);
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