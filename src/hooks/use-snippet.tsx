import { bulkAddData, initDB, Stores } from "@/lib/db";
import { useEffect, useState, createContext } from "react";

export class SnippetCode {
  id!: string
  name?: string;
  description?: string;
  lang?: string;
  rawCode?: string[];
  prefix?: string[];
  isFile?: boolean;
}

export interface Lang {
  id: string;
  name: string;
  count: number;
}

export interface SnippetConfig {
  url: string;
  langUrl: string;
}

const DEFAULT_CONFIG: SnippetConfig = {
  url: 'snippet.json',
  langUrl: 'langs.json'
}

export const SnippetContext = createContext<{
  snippets?: SnippetCode[],
  langs?: Lang[],
  setSnippets?: React.Dispatch<React.SetStateAction<SnippetCode[]>>,
  setLangs?: React.Dispatch<React.SetStateAction<Lang[]>>
}>({})

export function useSnippet(config: SnippetConfig = DEFAULT_CONFIG) {
  const [ publicSnippets, setPublicSnippets ] = useState<SnippetCode[]>([])
  const [ langs, setLangs ] = useState<Lang[]>([])
  const [ dbReady, setDbReady ] = useState<boolean>(false)

  useEffect(() => {
    const load = () => {
      fetch(config.url)
        .then(response => response.json())
        .then(data => {
          setPublicSnippets(data)
          return bulkAddData(Stores.Snippets, data)
        })
    }

    const loadLangs = () => {
      fetch(config.langUrl)
        .then(response => response.json())
        .then(data => {
          // setLangs(data)
          return bulkAddData<Lang>(Stores.Langs, data)
        })
        .then((storedLangs: Lang[]) => {
          if (publicSnippets && publicSnippets.length > 0) {
            for(const snippet of publicSnippets) {
              const lang = storedLangs.find(l => l.id === snippet.lang)
              if (lang) {
                lang.count++
              }
            }
            setLangs(storedLangs)
          }
        })
    }
    if (dbReady && (!publicSnippets || publicSnippets.length === 0))
      load()

    if (dbReady && publicSnippets && publicSnippets.length > 0 && (!langs || langs.length === 0))
      loadLangs()

    if (!dbReady) {
      initDB()
        .then(res => setDbReady(res))
    }
  }, [publicSnippets, langs, dbReady])

  return { snippets: publicSnippets, langs, setSnippets: setPublicSnippets, setLangs }
}