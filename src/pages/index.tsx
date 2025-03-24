import Markdown from "react-markdown";
import readme from "../../REPORT.md";
import rehypeHighlight from "rehype-highlight";
import remarkGfm from "remark-gfm";
import rehypeSanitize from "rehype-sanitize";
import rehypeRaw from "rehype-raw";
import "highlight.js/styles/github.css";

export default function Home() {
  return (
    <div className="px-16 py-8 flex flex-col items-center">
      <div className="w-1/2">
        <Markdown
          rehypePlugins={[rehypeSanitize, rehypeRaw, rehypeHighlight]}
          remarkPlugins={[remarkGfm]}
          components={{
            h1: ({ ...props }) => (
              <h1 className="text-3xl font-bold mt-8 mb-4" {...props} />
            ),
            h2: ({ ...props }) => (
              <h2 className="text-2xl font-bold mt-6 mb-3" {...props} />
            ),
            h3: ({ ...props }) => (
              <h3 className="text-xl font-bold mt-4 mb-2" {...props} />
            ),
            h4: ({ ...props }) => (
              <h4 className="text-lg font-bold mt-3 mb-1" {...props} />
            ),
            h5: ({ ...props }) => (
              <h5 className="text-base font-bold mt-2 mb-1" {...props} />
            ),
            ul: ({ ...props }) => (
              <ul className="list-disc pl-8 my-4" {...props} />
            ),
            ol: ({ ...props }) => (
              <ol className="list-decimal pl-8 my-4" {...props} />
            ),
            li: ({ ...props }) => <li className="mb-1" {...props} />,
            p: ({ ...props }) => (
              <p className="mb-4 leading-relaxed" {...props} />
            ),
            code: ({ ...props }) => (
              <code className="bg-gray-100 dark:bg-gray-600 px-1 py-0.5 rounded" {...props} />
            ),
            table: ({ ...props }) => (
              <table className="table-auto w-full" {...props} />
            ),
            th: ({ ...props }) => (
              <th className="border px-4 py-2" {...props} />
            ),
            td: ({ ...props }) => (
              <td className="border px-4 py-2" {...props} />
            ),
            tr: ({ ...props }) => <tr className="bg-gray-100 dark:bg-gray-600" {...props} />,
          }}
        >
          {readme}
        </Markdown>
      </div>
    </div>
  );
}
