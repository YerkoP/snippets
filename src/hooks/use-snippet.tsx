import { useEffect, useState, createContext } from "react";

export class SnippetCode {
  name?: string;
  description?: string;
  lang?: string;
  rawCode?: string[]
}

export interface SnippetConfig {
  url: string
}

const DEFAULT_CONFIG: SnippetConfig = {
  url: 'snippet.json'
}

export const SnippetContext = createContext<SnippetCode[]>([])

export function useSnippet(config: SnippetConfig = DEFAULT_CONFIG) {
  const [ publicSnippets, setPublicSnippets ] = useState<SnippetCode[]>([])

  useEffect(() => {
    const load = () => {
      fetch(config.url)
        .then(response => response.json())
        .then(data => setPublicSnippets(data))
    }
    if (!publicSnippets || publicSnippets.length === 0)
      load()
  }, [publicSnippets])

  return [ publicSnippets ]
}