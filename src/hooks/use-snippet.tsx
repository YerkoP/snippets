import { useEffect, useState, createContext } from "react";

export class SnippetCode {
  name?: string;
  description?: string;
  lang?: string;
  rawCode?: string[]
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
  langs?: Lang[]
}>({})

export function useSnippet(config: SnippetConfig = DEFAULT_CONFIG) {
  const [ publicSnippets, setPublicSnippets ] = useState<SnippetCode[]>([])
  const [ langs, setLangs ] = useState<Lang[]>([])

  useEffect(() => {
    const load = () => {
      fetch(config.url)
        .then(response => response.json())
        .then(data => setPublicSnippets(data))
    }

    const loadLangs = () => {
      fetch(config.langUrl)
        .then(response => response.json())
        .then(data => setLangs(data))
    }
    if (!publicSnippets || publicSnippets.length === 0)
      load()

    if (!langs || langs.length === 0)
      loadLangs()
  }, [publicSnippets, langs])

  return { snippets: publicSnippets, langs }
}