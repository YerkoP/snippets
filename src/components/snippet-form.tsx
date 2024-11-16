import { DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Code } from "./code";
import './snippet-form.css'
import React, { useState, useEffect, useRef, useContext } from "react";
import { SnippetContext } from "@/hooks/use-snippet";
// import { GuessLang } from 'guesslang-js'

export function SnippetForm() {
  const [ rawCode, setRawCode ] = useState('')
  const [ lang, setLang ] = useState('')
  const [ codeContent, setCodeContent ] = useState('')
  const codeRef = useRef<HTMLElement | null>(null)
  const snippetContext = useContext(SnippetContext)
  // const guessLang = new GuessLang()

  useEffect(() => {
    if (rawCode.length > 20 && !lang) {
      // guessLang.runModel(rawCode)f
      //   .then(res => setLang(res[0].languageId))
    }
    setCodeContent(`
\`\`\`${lang || 'plaintext'}
${rawCode}
\`\`\`
`)
  }, [rawCode, lang])

  const handleScroll = (e: React.UIEvent<HTMLTextAreaElement>) => {
    
    if (codeRef.current && codeRef.current.querySelector('pre')) {
      codeRef.current.querySelector('code')!.scrollLeft = (e.target as HTMLElement).scrollLeft
      codeRef.current.querySelector('pre')!.scrollTop = (e.target as HTMLElement).scrollTop
    }
  }

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Add new snippet</DialogTitle>
      </DialogHeader>
      <div className="grid w-full items-center gap-1.5">
        <Label htmlFor="name">Name</Label>
        <div className="flex w-full items-center space-x-2">
          <Input type="text" id="name" placeholder="Snippet name" />
          <Select onValueChange={id => setLang(id)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Lang" />
            </SelectTrigger>
            <SelectContent>
              {
                snippetContext.langs?.map(({ id, name }) => <SelectItem key={id} value={id}>{name}</SelectItem>)
              }
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="grid w-full items-center gap-1.5">
        <Label htmlFor="description">Description</Label>
        <Input type="text" id="description" placeholder="Snippet description" />
      </div>
      <div className="editor grid w-full items-center gap-1.5">
        <Code ref={codeRef} code={codeContent} copyButton={undefined}></Code>
        <textarea onScroll={handleScroll} value={rawCode} wrap="off" onChange={e => setRawCode(e.target.value)} spellCheck="false" autoCorrect="off" autoCapitalize="off" translate="no"></textarea>
      </div>
      <DialogFooter>
        <Button type="submit">Confirm</Button>
      </DialogFooter>
    </DialogContent>
  )
}