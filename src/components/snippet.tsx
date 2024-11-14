import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Code } from '@/components/code'

export interface SnipperProps {
  title: string;
  description: string
}

const codeContent = `
\`\`\`ts showLineNumbers
async function highlightCode(code: string) {
  const file = await unified()
    .use(remarkParse)
    .use(remarkRehype)
    .use(rehypePrettyCode, {
      transformers: [
        transformerCopyButton({
          visibility: 'always',
          feedbackDuration: 3_000,
        }),
      ],
    })
    .use(rehypeStringify)
    .process(code);

  return String(file);
}
\`\`\`
`

export function Snippet({ title, description }: SnipperProps) {
  return (
    <div className="space-y-2">
      <h2 className="scroll-m-20 text-3xl font-bold tracking-tight">{title}</h2>
      <span className="text-base text-muted-foreground">{description}</span>

      <Tabs defaultValue="code">
        <TabsList>
          <TabsTrigger value="code">Code</TabsTrigger>
          <TabsTrigger value="vscode">VsCode</TabsTrigger>
        </TabsList>
        <TabsContent value="code">
          <Code code={codeContent}></Code>
        </TabsContent>
        <TabsContent value="vscode">Change your password here.</TabsContent>
      </Tabs>

    </div>
  )
}