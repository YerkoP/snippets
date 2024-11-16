import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';
import rehypePrettyCode from 'rehype-pretty-code';
import { transformerCopyButton } from '@rehype-pretty/transformers';
import { forwardRef, useEffect, useState } from 'react';
import './code.css'

export interface CodeProps { code: string, copyButton?: 'always' | 'hover' | undefined }
const Code = forwardRef<
  React.ElementRef<'section'>,
  CodeProps
>(({ code, copyButton }, ref) => {
  const [highlightedCode, setHighlightedCode] = useState('');

  useEffect(() => {
    async function highlightCode(code: string) {
      const transformers = copyButton ? [
        transformerCopyButton({
          visibility: copyButton,
          feedbackDuration: 3_000,
        }),
      ] : []
      const file = await unified()
        .use(remarkParse)
        .use(remarkRehype)
        .use(rehypePrettyCode, {
          transformers
        })
        .use(rehypeStringify)
        .process(code);
    
      return String(file);
    }

    highlightCode(code)
    .then(c => setHighlightedCode(c))
  }, [code])
  return (
    <section
      ref={ref}
      className='w-full rounded-md [&_pre]:my-0 [&_pre]:max-h-[350px] [&_pre]:overflow-auto'
      dangerouslySetInnerHTML={{
        __html: highlightedCode,
      }}
    />
  );
})

export { Code }
