import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Code } from '@/components/code'
import { SnippetCode } from '@/hooks/use-snippet';

export interface SnipperProps {
  title: string;
  description: string
}


export function Snippet({ name, description, rawCode }: SnippetCode) {
  const codeContent = `
\`\`\`ts showLineNumbers
${rawCode && rawCode.join('\n')}
\`\`\`
`
  return (
    <div className="space-y-2">
      <h2 className="scroll-m-20 text-3xl font-bold tracking-tight">{name}</h2>
      <span className="text-base text-muted-foreground">{description}</span>

      <Tabs defaultValue="code">
        <TabsList>
          <TabsTrigger value="code">Code</TabsTrigger>
          <TabsTrigger value="vscode">VsCode</TabsTrigger>
        </TabsList>
        <TabsContent value="code">
          <Code code={codeContent} copyButton='always'></Code>
        </TabsContent>
        <TabsContent value="vscode">Change your password here.</TabsContent>
      </Tabs>

    </div>
  )
}