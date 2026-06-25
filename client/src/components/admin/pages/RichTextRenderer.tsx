'use client';

interface RichTextRendererProps {
  content: string;
  className?: string;
}

export function RichTextRenderer({ content, className = '' }: RichTextRendererProps) {
  if (!content) return null;

  return (
    <div
      className={`prose prose-lg max-w-none
        prose-headings:font-display prose-headings:text-gray-900
        prose-h1:text-3xl prose-h1:font-bold prose-h1:mb-6
        prose-h2:text-2xl prose-h2:font-bold prose-h2:mb-4 prose-h2:mt-8
        prose-h3:text-xl prose-h3:font-semibold prose-h3:mb-3 prose-h3:mt-6
        prose-p:text-gray-600 prose-p:leading-relaxed prose-p:mb-4
        prose-a:text-[#10B981] prose-a:no-underline hover:prose-a:underline
        prose-strong:text-gray-900 prose-strong:font-semibold
        prose-code:bg-gray-100 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-code:before:content-none prose-code:after:content-none
        prose-pre:bg-gray-900 prose-pre:text-gray-100 prose-pre:rounded-xl
        prose-blockquote:border-l-[#10B981] prose-blockquote:bg-[#10B981]/5 prose-blockquote:py-1 prose-blockquote:px-4 prose-blockquote:rounded-r-lg
        prose-img:rounded-xl prose-img:shadow-lg
        prose-table:border-collapse prose-th:bg-gray-50 prose-th:border prose-th:border-gray-200 prose-th:px-4 prose-th:py-2 prose-th:text-left prose-td:border prose-td:border-gray-200 prose-td:px-4 prose-td:py-2
        prose-li:text-gray-600
        prose-hr:border-gray-200 prose-hr:my-8
        ${className}`}
        dangerouslySetInnerHTML={{ __html: content }}
    />
  );
}
