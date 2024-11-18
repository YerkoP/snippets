import { DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Code } from "./code";
import './snippet-form.css'
import React, { useState, useEffect, useRef, useContext } from "react";
import { SnippetContext } from "@/hooks/use-snippet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Switch } from "./ui/switch";
import { Separator } from "./ui/separator";

export function SnippetForm() {
  const [ rawCode, setRawCode ] = useState('')
  const [ lang, setLang ] = useState('')
  const [ codeContent, setCodeContent ] = useState('')
  const codeRef = useRef<HTMLElement | null>(null)
  const snippetContext = useContext(SnippetContext)

  useEffect(() => {
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
      <Tabs defaultValue="config">
        <TabsList>
          <TabsTrigger value="config">Config</TabsTrigger>
          <TabsTrigger value="code">Code</TabsTrigger>
        </TabsList>
        <TabsContent value="config">
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
          <Separator className="my-2"></Separator>
          <div className="grid w-full items-center gap-1.5 mb-4">
            <Label htmlFor="prefix">VsCode</Label>
            <Input type="text" id="prefix" placeholder="Snippet description" />
          </div>
          <div className="flex flex-row items-center justify-between rounded-lg border p-4">
            <div className="space-y-0.5 flex flex-col">
              <Label className="font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-base" htmlFor="isFile">Is file?</Label>
              <span className="text-base text-muted-foreground">Use this snippet as the whole content of a file</span>
            </div>
            <Switch id="isFile"></Switch>
          </div>
        </TabsContent>
        <TabsContent value="code">
          <div className="editor grid w-full items-center gap-1.5">
            <Code ref={codeRef} code={codeContent} copyButton={undefined}></Code>
            <textarea onScroll={handleScroll} value={rawCode} wrap="off" onChange={e => setRawCode(e.target.value)} spellCheck="false" autoCorrect="off" autoCapitalize="off" translate="no"></textarea>
          </div>
          
        </TabsContent>
      </Tabs>
      <DialogFooter>
        <Button type="submit">Confirm</Button>
      </DialogFooter>
    </DialogContent>
  )
}