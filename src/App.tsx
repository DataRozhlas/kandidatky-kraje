//import { Label } from "@/components/ui/label"
import { useState, useEffect } from "react"
import { DSVRowString, tsvParse } from "d3"

import Stat from "@/components/Stat"
import SelectYears from "@/components/SelectYears"
import Filters from "@/components/Filters"
import MobileFilters from "@/components/MobileFilters"
import { DataTable } from "@/components/DataTable"
import { columns } from "./components/columns"

import { View, Candidate, Party } from "@/types"

import { usePostMessageWithHeight } from './hooks/usePostHeightMessage'

const yearsAvailable = ["2004", "2009", "2014", "2019", "2024"]

const countFemaleRatio = (data: any[]) => {
  if (data.length === 0) return "-- %";
  let total = data.length;
  let females = data.filter((d) => d.POHLAVI === "F").length
  return (females / total).toLocaleString("cs-CZ", { style: 'percent', maximumFractionDigits: 1 });
};

const countAverageAge = (data: any[]) => {
  if (data.length === 0) return "-- let";
  let total = data.length;
  let sum = data.reduce((acc, d) => acc + Number(d.VEK), 0)
  return (sum / total).toLocaleString("cs-CZ", { maximumFractionDigits: 1 }) + " let";
}

const countUnique = (data: any[], key: string) => {
  if (data.length === 0) return "--";
  const unique = new Set(data.map((d) => d[key])).size
  return unique.toLocaleString("cs-CZ")
}

function App({ pref }: { pref: string }) {

  const [view, setView] = useState<View>({ years: ["2024"], rank: [1, 28], age: [18, 100], sex: ["M", "F"], search: { value: "", fields: [true, true, true] }, mandate: pref === "1" ? "P" : "X", parties: [] })
  const [data, setData] = useState<{ [key: string]: Candidate[] }>({})
  const [selected, setSelected] = useState<Candidate[]>([])
  const [filtered, setFiltered] = useState<Candidate[]>([])
  const [cvsData, setCvsData] = useState<Party[]>([])
  //const [loading, setLoading] = useState<boolean>(true)

  const { containerRef, postHeightMessage } = usePostMessageWithHeight(`kandidatky-euro-24`)

  useEffect(() => {
    postHeightMessage()
  }, [filtered])


  //load data if not already loaded
  useEffect(() => {
    function fetchData(year: string) {
      fetch(`./data/${year}/kand.tsv`)
        .then((response) => response.text())
        .then((text) => tsvParse(text))
        .then((parsed) => {
          const candidates: Candidate[] = parsed.map((row: DSVRowString<string>) => {
            return {
              ESTRANA: row.ESTRANA,
              PORCISLO: row.PORCISLO,
              JMENO: row.JMENO,
              PRIJMENI: row.PRIJMENI,
              TITULPRED: row.TITULPRED,
              TITULZA: row.TITULZA,
              VEK: row.VEK,
              STATOBCAN: row.STATOBCAN,
              POVOLANI: row.POVOLANI,
              BYDLISTEN: row.BYDLISTEN,
              BYDLISTEK: row.BYDLISTEK,
              PSTRANA: row.PSTRANA,
              NSTRANA: row.NSTRANA,
              PLATNOST: row.PLATNOST,
              POCHLASU: row.POCHLASU,
              POCPROC: row.POCPROC,
              MANDAT: row.MANDAT,
              PORADIMAND: row.PORADIMAND,
              PORADINAHR: row.PORADINAHR,
              POHLAVI: row.POHLAVI,
              ROK: row.ROK,
              VSTRANA: row.VSTRANA,
              NAVRHUJICI: null,
              VOLEBNI: null,
              PRISLUSNOST: null,
            }
          });
          setData(prev => { return { ...prev, [year]: candidates } });
        })
    }

    // Check if data for all years in view.years has already been fetched
    const allDataFetched = view.years.every(year => data[year]);

    if (allDataFetched) {
      // If data for all years has been fetched, return early to prevent fetching again
      return;
    }

    view.years.forEach(async (year) => {
      if (data[year]) return;
      //  setLoading(true)
      fetchData(year)
      console.log("fetched", year)
    })

    if (cvsData.length === 0) {
      //   setLoading(true)
      fetch(`./data/2024/cvs.tsv`)
        .then((response) => response.text())
        .then((text) => tsvParse(text))
        .then((parsed) => {
          const parties: Party[] = parsed.map((row: DSVRowString<string>) => {
            return {
              VSTRANA: row.VSTRANA,
              NAZEVCELK: row.NAZEVCELK,
              NAZEV_STRV: row.NAZEV_STRV,
              ZKRATKAV30: row.ZKRATKAV30,
              ZKRATKAV8: row.ZKRATKAV8,
              POCTR_SLO: row.POCTR_SLO,
              SLOZENI: row.SLOZENI,
              ZKRATKA_OF: row.ZKRATKA_OF,
              TYPVS: row.TYPVS,
              PLNYNAZEV: row.PLNYNAZEV,
            }
          });
          setCvsData(parties)
        })
      console.log("fetched cvs")
    }

  }, [view.years])

  // join data with cvs
  useEffect(() => {
    if (cvsData.length === 0) return;
    yearsAvailable.forEach((year) => {
      if (data[year] && !data[year][0].NAVRHUJICI) {
        setData(prev => {
          return {
            ...prev,
            [year]: data[year].map((d: any) => {
              const partyN = cvsData.find((c: any) => c.VSTRANA === d.NSTRANA)
              const partyV = cvsData.find((c: any) => c.VSTRANA === d.VSTRANA)
              const partyP = cvsData.find((c: any) => c.VSTRANA === d.PSTRANA)
              return { ...d, NAVRHUJICI: partyN, VOLEBNI: partyV, PRISLUSNOST: partyP }
            })
          }

        })
        console.log("joined", year)
        //   setLoading(false)
      }
    })
  }, [data, cvsData])

  // select data by year
  useEffect(() => {
    let selected: any[] = []
    view.years.forEach((year) => {
      if (data[year]) {
        selected = selected.concat(data[year])
      }
    })
    setSelected(selected)
  }, [data, view.years])

  // filter data with greater granularity
  useEffect(() => {
    const updated = selected.filter((row: Candidate) => {

      if (Number(row.PORCISLO) >= view.rank[0] && Number(row.PORCISLO) <= view.rank[1] &&
        Number(row.VEK) >= view.age[0] && Number(row.VEK) <= view.age[1] &&
        (view.sex.length > 1 || view.sex.includes(row.POHLAVI)) &&
        (view.search.value.length === 0 ||
          (view.search.fields[0] && `${row.JMENO.toLocaleUpperCase("cs-CZ")} ${row.PRIJMENI.toLocaleUpperCase("cs-CZ")}`.includes(view.search.value)) ||
          (view.search.fields[1] && row.POVOLANI.toLocaleUpperCase("cs-CZ").includes(view.search.value)) ||
          (view.search.fields[2] && row.BYDLISTEN.toLocaleUpperCase("cs-CZ").includes(view.search.value))) &&
        (view.mandate === "X" || row.MANDAT === view.mandate || view.mandate === "P" && row.MANDAT === "A" && Number(row.POCPROC) >= 5 && Number(row.PORADIMAND) < Number(row.PORCISLO)) &&
        (view.parties.length === 0 || view.parties.includes(row.VSTRANA))
      ) { return true }

      return false
    })
    setFiltered(updated)
  }, [selected, view])


  return (
    <div ref={containerRef} className="max-w-[1070px] mx-auto flex flex-col gap-5 mb-8">
      <SelectYears years={view.years} setView={setView} yearsAvailable={yearsAvailable} />
      <Filters data={selected} view={view} setView={setView} />
      <div className="flex flex-row flex-wrap lg:flex-nowrap justify-center gap-1">
        <Stat title="Celkem" number={selected.length.toLocaleString("cs-CZ")} subtitle="kandidujících" icon="user" />
        <Stat title="Vybráno" number={(filtered.length).toLocaleString("cs-CZ")} subtitle="kandidujících" icon="user-check" />
        <Stat title="Podíl žen" number={countFemaleRatio(filtered)} subtitle="z vybraných" icon="female" />
        <Stat title="Průměrný věk" number={countAverageAge(filtered)} subtitle="u vybraných" icon="clock" />
        <Stat title="Volebních stran" number={countUnique(filtered, "VSTRANA")} subtitle="koalice = 1 strana" icon="vote" />
      </div>
      <MobileFilters data={selected} view={view} setView={setView} />
      <DataTable columns={columns} data={filtered} years={view.years} />

    </div>

  )
}

export default App
