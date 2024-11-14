import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';
import rehypePrettyCode from 'rehype-pretty-code';
import { transformerCopyButton } from '@rehype-pretty/transformers';
import { useEffect, useState } from 'react';
import './code.css'

/**
 * Server Component example
 */

export function Code({ code }: { code: string }) {
  const [highlightedCode, setHighlightedCode] = useState('');

  useEffect(() => {
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

    highlightCode(code)
    .then(c => setHighlightedCode(c))
  }, [code])
  return (
    <section
      className='w-full rounded-md [&_pre]:my-0 [&_pre]:max-h-[350px] [&_pre]:overflow-auto'
      dangerouslySetInnerHTML={{
        __html: highlightedCode,
      }}
    />
  );
}

