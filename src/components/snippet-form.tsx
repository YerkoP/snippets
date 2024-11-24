import { DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Code } from "@/components/code";
import './snippet-form.css'
import React, { useState, useEffect, useRef, useContext } from "react";
import { SnippetCode, SnippetContext } from "@/hooks/use-snippet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { addData, Stores, updateData } from "@/lib/db";

export function SnippetForm({ reset }: { reset: boolean }) {
  const [ rawCode, setRawCode ] = useState('')
  const [ lang, setLang ] = useState('')
  const [ codeContent, setCodeContent ] = useState('')
  const codeRef = useRef<HTMLElement | null>(null)
  const snippetContext = useContext(SnippetContext)
  const [ name, setName ] = useState('')
  const [ desc, setDesc ] = useState('')
  const [ isFile, setIsFile ] = useState(false)
  const [ prefix, setPrefix ] = useState<string[]>([])
  const [ submitted, update ] = useState<number | undefined>()
  const [ errorText, setErrorText ] = useState('')
  const [ currentTab, setCurrentTab ] = useState<string>('config')

  useEffect(() => {
    setCodeContent(`
\`\`\`${lang || 'plaintext'}
${rawCode}
\`\`\`
`)
  }, [rawCode, lang])

  useEffect(() => {
    if (reset) {
      update(undefined)
      setErrorText('')
      setCurrentTab('config')
      setLang('')
      setName('')
      setRawCode('')
      reset = false
    }
  }, [ reset ])

  const handleScroll = (e: React.UIEvent<HTMLTextAreaElement>) => {
    if (codeRef.current && codeRef.current.querySelector('pre')) {
      codeRef.current.querySelector('code')!.scrollLeft = (e.target as HTMLElement).scrollLeft
      codeRef.current.querySelector('pre')!.scrollTop = (e.target as HTMLElement).scrollTop
    }
  }

  const onSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    update(Date.now())
    // validate required
    if (!lang || !name || !rawCode) {
      console.log('lang', lang)
      console.log('name', name)
      console.log('rawCode', rawCode)
      if (!lang || !name) {
        setCurrentTab('config')
      } else if (lang && name && !rawCode) {
        setCurrentTab('code')
      }
      setErrorText('Missing required values')
      return
    }

    const snippetCode = new SnippetCode()
    snippetCode.id = window.crypto.randomUUID()
    snippetCode.description = desc
    snippetCode.lang = lang
    snippetCode.name = name
    snippetCode.rawCode = rawCode.split('\n')
    snippetCode.isFile = isFile
    addData(Stores.Snippets, snippetCode)
      .then(newSnippet => {
        if (typeof newSnippet === 'object') {
          // add new snippet
          const currentSnippets = snippetContext.snippets || []
          currentSnippets.push(newSnippet as SnippetCode)
          snippetContext.setSnippets && snippetContext.setSnippets(currentSnippets)
          // update count
          const foundLangId = snippetContext.langs?.findIndex(l => l.id === (newSnippet as SnippetCode).lang)
          if (foundLangId !== undefined && snippetContext.langs) {
            const foundLang = snippetContext.langs[foundLangId]
            if (foundLang) {
              foundLang.count++
              snippetContext.langs[foundLangId] = foundLang
              snippetContext.setLangs && snippetContext.setLangs(snippetContext.langs)
              return updateData(Stores.Langs, foundLang)
            }
          }
        }
        return null
      })
  }

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Add new snippet</DialogTitle>
      </DialogHeader>
      <Tabs value={currentTab} onValueChange={value => setCurrentTab(value)}>
        <TabsList>
          <TabsTrigger value="config">Config</TabsTrigger>
          <TabsTrigger value="code">Code</TabsTrigger>
        </TabsList>
        <TabsContent value="config">
          <div className="grid w-full items-center gap-1.5">
            <Label className={(submitted && !name) ? 'has-error' : ''} htmlFor="name">Name</Label>
            <div className="flex w-full items-center space-x-2">
              <Input className={(submitted && !name) ? 'has-error' : ''} type="text" id="name" placeholder="Snippet name" value={name} onChange={e => setName(e.target.value)}/>
              <Select onValueChange={id => setLang(id)}>
                <SelectTrigger className={(submitted && !lang) ? 'has-error w-[180px]' : 'w-[180px]'}>
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
            <Input type="text" id="description" placeholder="Snippet description" value={desc} onChange={e => setDesc(e.target.value)}/>
          </div>
          <Separator className="my-2"></Separator>
          <div className="grid w-full items-center gap-1.5 mb-4">
            <Label htmlFor="prefix">VsCode prefix</Label>
            <Input type="text" id="prefix" placeholder="Snippet prefixes" value={prefix.join(' ')} onChange={e => setPrefix(e.target.value.split(' '))}/>
          </div>
          <div className="flex flex-row items-center justify-between rounded-lg border p-4">
            <div className="space-y-0.5 flex flex-col">
              <Label className="font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-base" htmlFor="isFile">Is file?</Label>
              <span className="text-base text-muted-foreground">Use this snippet as the whole content of a file</span>
            </div>
            <Switch id="isFile" checked={isFile} onCheckedChange={e => setIsFile(e)}></Switch>
          </div>
        </TabsContent>
        <TabsContent value="code">
          <div className="editor grid w-full items-center gap-1.5">
            <Code className={(submitted && !rawCode) ? 'has-error' : ''} ref={codeRef} code={codeContent} copyButton={undefined}></Code>
            <textarea onScroll={handleScroll} value={rawCode} wrap="off" onChange={e => setRawCode(e.target.value)} spellCheck="false" autoCorrect="off" autoCapitalize="off" translate="no"></textarea>
          </div>
        </TabsContent>
      </Tabs>
      <p className="text-sm font-medium text-destructive">{errorText}</p>
      <DialogFooter>
        <Button type="submit" onClick={onSubmit}>Confirm</Button>
      </DialogFooter>
    </DialogContent>
  )
}